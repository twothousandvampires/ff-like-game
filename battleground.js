import { EnemyStack } from "/enemyStack.js"
import { Player } from "./player.js"
import {Enemy} from './scripts/enemy/enemy.js'
import { Loger } from "./loger.js"
import {Game} from "./main.js";

import {Render} from "./render.js";

export class Battleground{

        static player_turn_delay = 2000
        static clicked_spell = undefined
        static turn = 'player'
        static clickDelay = true;
        static player
        static enemyStack
        static mouseClick = {
            'x' : undefined,
            'y' : undefined
        }

        static plan = []

        static newBattle(enemy, player){
            function down_listener(e){
                Battleground.mouseClick.x = e.offsetX
                Battleground.mouseClick.y = e.offsetY
                console.log(2)
            }
            function up_listener(e){
                Battleground.mouseClick.x = undefined
                Battleground.mouseClick.y = undefined
            }
            addEventListener('mousedown' , down_listener)
            addEventListener('mouseup' , up_listener)
            Battleground.player = player
            Battleground.plan = []
            Battleground.generatePlan()
            Battleground.enemyStack = enemy;
            Battleground.enemyStack.battle_cells = Battleground.plan
            Battleground.draw_skill_panel()
            Loger.addLog(`<p>the battle begin!</p>`)
        }

        static generatePlan(bush_count, rock_count){
            Battleground.plan = []
            for(let i = 0; i < 7; i++){
                let row = [];
                for(let j = 0; j < 7 ; j++){
                    let cell = {
                        'x' : j,
                        'y' : i,
                        'image' : new Image()
                    }
                    let r = Math.random() * 100;
                    if(r > 90){
                        cell.type = 1
                        cell.image.src = `/battle_image/bush.png`
                    }
                    else if(r >80){
                        if((i != 3 || j != 0)&&(i != 0 || j != 6)&&(i != 3 || j != 6)&&(i != 6 || j != 6)){
                            cell.type = 2
                            cell.image.src = `/battle_image/rock.png`
                        }
                        else{
                            cell.type = 0
                            cell.image.src = `/battle_image/grass.png`
                        }
                    }
                    else{
                        cell.type = 0
                        cell.image.src = `/battle_image/grass.png`
                    }
                    row.push(cell)
                }
                Battleground.plan.push(row);
            }
        }

        static draw(){
            Render.drawBattleField(Battleground.plan, Battleground.enemyStack, Battleground.player)
        }

        static battleLoop(){
            if(Game.game == 'battle'){
                switch(Battleground.turn){
                    case 'player':
                        Battleground.playerTurn();
                        break;
                    case 'enemy' :
                        Battleground.enemyTurn();
                        break;
                }
                Battleground.draw();
                Battleground.checkWinner()
            }
        }

        static playerTurn(){

            if(Battleground.player_turn_delay >= 2000){
                if(Battleground.clicked_spell){
                    if(Battleground.clicked_spell.can()){
                        Battleground.clicked_spell.act(Battleground.player, false ,Battleground.enemyStack)
                        Battleground.turn = 'enemy'
                        Battleground.clicked_spell = undefined
                    }
                }
                let clickResult = Battleground.clickChecker(Battleground.mouseClick);

                if(clickResult instanceof Enemy){
                    if(Battleground.clicked_spell){

                        if(Battleground.clicked_spell.can(clickResult)){
                            if(Battleground.player.current_mana >= Battleground.clicked_spell.mana_cost){
                                Battleground.clicked_spell.act(Battleground.player, clickResult, Battleground.enemyStack)
                                Battleground.clicked_spell = undefined
                                Battleground.turn = 'enemy'
                                return
                            }
                            else{
                                Loger.addLog(`<p class = 'redtext'>not enough mana<p>`)
                                Battleground.clicked_spell = undefined
                                Battleground.player_turn_delay = 0
                            }
                        }
                    }
                    else if(Math.abs(Battleground.player.battlePos.x - clickResult.battlePos.x) <= 1 && Math.abs(Battleground.player.battlePos.y - clickResult.battlePos.y) <= 1){
                        Battleground.player.doMelleHit(clickResult, Battleground.enemyStack)
                        Battleground.turn = `enemy`
                    }

                }
                else if(typeof clickResult === 'object'){
                    if(Battleground.clicked_spell){
                        if(Battleground.clicked_spell.can(clickResult)){
                            Battleground.player_turn_delay = 0
                        }
                        else{
                            Loger.addLog(`<p class = 'redtext'>wrong target<p>`)
                            Battleground.player_turn_delay = 0
                            Battleground.clicked_spell = undefined
                        }
                    }
                    else if(Math.abs(Battleground.player.battlePos.x - clickResult.x) <= 1 && Math.abs(Battleground.player.battlePos.y - clickResult.y) <= 1){
                        if(Battleground.plan[clickResult.y][clickResult.x].type !=2 ){
                            Battleground.player.battlePos.x = clickResult.x;
                            Battleground.player.battlePos.y = clickResult.y;
                            Battleground.turn = 'enemy'
                        }

                    }
                }
            }
            Battleground.player_turn_delay +=20
        }

        static enemyTurn(){
            function doAct(i){
                setTimeout(() => {  Battleground.enemyStack.enemy[i].act(Battleground.player)  },1500 * (i+1))
            }

            for (let i = 0 ; i <= Battleground.enemyStack.enemy.length; i++){
                doAct(i)
            }
            Battleground.turn = 'await';
            setTimeout(()=>{
                Battleground.turn = 'player'
            }, Battleground.enemyStack.enemy.length * 1500)

        }

        static checkWinner(){
            if(Battleground.enemyStack.enemy.length === 0){
                Game.world.deleteEnemyStack(Battleground.enemyStack)
                Battleground.mouseClick = {
                    'x' : undefined,
                    'y' : undefined
                }
                Battleground.enemyStack = undefined
                Battleground.timer = 0;
                Battleground.i = 0;
                Battleground.turn = 'player'

                Battleground.player_turn_delay = 2000
                let todelete = document.getElementById('skill_panel')
                todelete.parentNode.removeChild(todelete)
                Battleground.clicked_spell = undefined
                Battleground.clickResult = undefined
                Game.game = 'world'
            }
        }

        static clickChecker(e){

            let result;

            Battleground.enemyStack.enemy.forEach(elem=>{

                if((e.x > elem.battlePos.x * 100 && e.x < elem.battlePos.x *100 +100) &&(e.y > elem.battlePos.y * 100 && e.y < elem.battlePos.y * 100 + 100)){
                    result = elem
                }

            })

            if(!result){
                Battleground.plan.forEach(elemrow => {
                    elemrow.forEach(elem =>{
                        if((e.x > elem.x * 100 && e.x < elem.x *100 +100) &&(e.y > elem.y * 100 && e.y < elem.y * 100 + 100)){
                            result = elem
                        }
                    })

                })
            }
            return result
        }

        static draw_skill_panel(){
            let body = document.getElementById('body')
            let panel = document.createElement('div')

            panel.id = 'skill_panel'

            for(let i = 0;i <Battleground.player.skill_panel.length; i++){
                console.log(Battleground.player.skill_panel[i])
                if(Object.keys(Battleground.player.skill_panel[i]).length !== 0){
                    let item = document.createElement('div')
                    let image = document.createElement('img')
                    image.className ='inventoryImage';
                    image.src = Battleground.player.skill_panel[i].image_path


                    item.addEventListener('click', e =>{
                        Battleground.clicked_spell = Battleground.player.skill_panel[i]
                    })

                    item.appendChild(image)
                    panel.appendChild(item)

                }
            }

            body.appendChild(panel)
        }

}

