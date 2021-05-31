import { Loger } from './loger.js';
import {Skilltree} from './skilltree.js'
import { Functions} from "./functions.js";
import {Game} from "./main.js";
export class Player{
    constructor(world){
        this.strength = 2
        this.stamina = 2
        this.intellect = 2
        this.willpower = 2
        this.agility = 2
        this.speed = 2

        this.quest = [];
        this.ignite_power = 1
        
        this.evade = 5
        this.block = 0
        this.critical_chance = 5
        this.crirical_multi = 1.5
        this.melle_ll = 0
        this.spell_ll = 0

        this.world = world
        this.skill_panel = [{},{},{}];
        this.skill_point = 0
        this.skill_tree = new Skilltree()
        this.skill_page = 'elemental'
        this.skill_tree_open = false
        this.gold = 10;
        this.min_cold_damage = 0;
        this.max_cold_damage = 0;
        this.min_fire_damage = 0;
        this.max_fire_damage = 0;
        this.min_light_damage = 0;
        this.max_light_damage = 0;

        this.cold_res = 0;
        this.light_res = 0;
        this.fire_res = 0;
        this.armour = 0;

        this.current_mana = 5
        this.max_mana = 5
        this.current_hp = 12
        this.max_hp = 12
        this.level = 0
        this.exp_for_level = 10
        this.exp = 0

        this.min_damage = 1
        this.max_damage = 3
        
        this.image = new Image()
        this.image.src = 'units_image/player.png'
        this.size = 100
        this.plan = world.plan
        this.pos = {
            "x" : 5,
            "y" : 5
        }
        this.battlePos = {
            'x' : 0,
            'y' : 3
        }
        addEventListener('keydown', e => {
            let g = false;
            let move = {
                'x' : this.pos.x,
                'y' : this.pos.y
            };
            if(!g && Game.game == 'world'){
                g = true;
                console.log(this.world.dangeon);
                switch(e.keyCode){
                    
                    case 87:
                        move.y --;
                        if(move.y <= 0) move.y = 0                 
                        break;
                    case 83:
                        move.y ++;
                        if(!this.world.dangeon){
                            if(move.y >= world.worldHeight- 1) move.y = world.worldHeight -1  
                        }
                        else{
                            if(move.y >= 10 - 1) move.y = 10-1  
                        }
                        break;
                    case 65:
                        move.x --;
                        if(move.x <= 0) move.x = 0
                        break;
                    case 68:
                        move.x ++;
                        if(!this.world.dangeon){
                            if(move.x >= world.worldWidth -1 ) move.x = world.worldWidth - 1  
                        }
                        else{
                            if(move.x >= 10-1 ) move.x = 10 - 1  
                        }
                        break;
                    case 73:
                        Game.game = 'inventory';
                        break;
                    case 84:
                        this.world.game.game = 'skill_tree';
                        break;
                    case 67:
                        this.world.game.game = 'craft';
                        break;
                    
                }
          
                if(this.coll(move)){
                    this.pos = move
                }
               
            }
            g = false
            
        })
        

    }

    coll(move){
       if(!this.world.dangeon){
            return this.plan[move.y][move.x].type !== 1;
       }
       else{
           return this.world.current_dangeon.plan[move.y][move.x].type !== 1;
       }
        
    }

    addExp(count){
        this.exp += count;
        if(this.exp >= this.exp_for_level){
            while(this.exp >= this.exp_for_level){
                Loger.addLog(`<p>you reach the level!</p>`)
                this.level ++
                this.skill_point ++
                let over = this.exp - this.exp_for_level
                this.exp = over;
                this.exp_for_level = Math.floor(this.exp_for_level * 1.2)
            }          
        }
    }

    doDamage(enemy, stack){
        
        let totalPhysDamage = Math.floor(Math.random()  * (this.max_damage - this.min_damage+1) + this.min_damage);
    
        totalPhysDamage = Math.ceil(totalPhysDamage  - totalPhysDamage * (enemy.armour/100))
        console.log('phys' + totalPhysDamage)

        let totalColdDamage = Math.floor(Math.random()  * (this.max_cold_damage - this.min_cold_damage+1) + this.min_cold_damage);
        totalColdDamage = Math.ceil(totalColdDamage  - totalColdDamage * (enemy.cold_res/100))
        console.log('cold' + totalColdDamage)

        let totalFireDamage = Math.floor(Math.random()  * (this.max_fire_damage - this.min_fire_damage+1) + this.min_fire_damage);
        totalFireDamage = Math.ceil(totalFireDamage  - totalFireDamage * (enemy.fire_res/100))
        console.log('fire' + totalFireDamage)

        let totalLightDamage = Math.floor(Math.random()  * (this.max_light_damage - this.min_light_damage +1) + this.min_light_damage);
        totalLightDamage = Math.ceil(totalLightDamage  - totalLightDamage * (enemy.light_res/100))
        console.log('light' + totalLightDamage)

        let totalDamage = totalColdDamage + totalPhysDamage + totalFireDamage + totalLightDamage;
      

        if(Math.random() * 100 < enemy.block){
            Loger.addLog(`${enemy.name} blocked`)
        }
        else if(Math.random() * 100 < enemy.evade){
            Loger.addLog(`${enemy.name} evaded`)
        }
        else{
            if(Math.random() * 100 < this.critical_chance){
                totalDamage = Math.ceil(totalDamage * this.crirical_multi)
                Loger.addLog(`<p>CRITICAL!</p>`)
            }
            Loger.damageInfo(totalDamage, enemy)
            Loger.addLog(`<p>you deal ${totalDamage} to ${enemy.name}</p>`)
            enemy.takeDamage(totalDamage, this, stack)
            if(this.melle_ll != 0){
                let ll = Math.ceil(totalDamage * this.melle_ll/100)
                this.current_hp += ll
                if(this.current_hp > this.max_hp){
                    this.current_hp = this.max_hp
                }
                Loger.addLog(`<p>you leached ${ll} hp</p>`)
            } 
        }
       
    }

    openTree(redraw = false){
        if(!this.skill_tree_open || redraw){
            this.skill_tree_open = true;
            let todelete = document.getElementById('skill_container');
            if(todelete){
                todelete.parentNode.removeChild(todelete)
            }
            let container = Functions.createElem('div', 'skill_container');
            let body = document.getElementById('body');
            let menu = this.load_menu();

            let skill_page = this.load_skill_page();
            let skill_panel = this.load_skill_panel()
            
            let skill_page_and_panel = document.Functions.createElement('div')

            skill_page.id = 'skill_page'
            skill_panel.id = 'skill_panel'  
    
            skill_page_and_panel.appendChild(skill_page)
            skill_page_and_panel.appendChild(skill_panel)
            
            skill_page_and_panel.id = 'skill_page_panel'

            container.appendChild(menu)
            container.appendChild(skill_page_and_panel)
            body.appendChild(container)
        }
        
    }
    
    load_menu(){
        let menu = Functions.createElem('div', 'skill_menu')

        let fire = Functions.createElem('div', 'skill_menu_button');
        fire.innerHTML = '<p>elemental</p>'
        fire.addEventListener('click', e =>{
            this.skill_page = 'elemental'
        })

        let exit = Functions.createElem('div')
        exit.innerHTML = '<p>Exit</p>'
        exit.addEventListener('click', e =>{
            this.skill_tree_open = false            
            this.world.game.game = 'world'
            let toDelete = document.getElementById('skill_container')
            if(toDelete){
            toDelete.parentNode.removeChild(toDelete)
        }
        })
        menu.appendChild(exit)
        menu.appendChild(fire)
        return menu
    }

    load_skill_page(){
        let skill_page = Functions.createElem('div')

        switch(this.skill_page){
            case 'elemental':
                for(let i = 0 ; i < this.skill_tree.elemental_skills.length; i++){
                    let discTimer;
                    console.log("!")
                    let item = Functions.createElem('div')
                    //let image = Functions.createElem('img', false, 'inventoryImage')
                    item.style.backgroundImage = `url(${this.skill_tree.elemental_skills[i].image_path})`
                    //item.appendChild(image)
                    item.classList = 'inventoryImage'
                    if(this.skill_tree.elemental_skills[i].level != 0){
                        let level = document.Functions.createElement('p')
                        level.innerText = this.skill_tree.elemental_skills[i].level;
                        item.appendChild(level)
                    }
                    this.skill_tree.elemental_skills[i].num = i
                    item.addEventListener('click', e =>{
                        console.log(this.skill_tree.elemental_skills[i])
                        if(this.skill_point >0){
                            this.skill_tree.elemental_skills[i].level_up();
                            this.skill_point --
                            this.openTree(true)
                        }                       
                    })
                    item.addEventListener('mouseover', e =>{
                        discTimer = setTimeout(()=>{
                            this.showDiscription(this.skill_tree.elemental_skills[i], e)
                        },1000)
                    })
                    item.addEventListener('mouseout', e =>{
                        clearTimeout(discTimer)
                        this.closeDiscription();
                    })
                    skill_page.appendChild(item)
                }
                break;
        }
        return skill_page;
    }

    load_skill_panel(){
        
        let container = Functions.createElem('div');
        for(let i = 0;i <this.skill_panel.length; i++){
            let item = Functions.createElem('div' , false,'inventoryImage' )

            if(Object.keys(this.skill_panel[i]).length == 0){
                item.classList = 'inventoryImage'
                item.style.backgroundColor = 'gray'
                item.addEventListener('click', e =>{
                    this.choose_skill(e, i)                  
                })
            }
            else{
                let image = Functions.createElem('img', false, 'inventoryImage')
                image.src = this.skill_panel[i].image_path
                item.appendChild(image)
                item.addEventListener('click', e =>{
                    this.skill_panel[i] = {}
                    this.openTree(true)                  
                })
            }
q

            
            container.appendChild(item)

        }

        return container
    }
    
    
    choose_skill(e, num){
        let toDelete = document.getElementById('choose_skill_panel')
        if(toDelete){
            toDelete.parentNode.removeChild(toDelete)
        }
        let container = Functions.createElem('div', 'choose_skill_panel')
        container.style.position = 'absolute'
        container.style.top = e.y + 15 + 'px'
        container.style.left = e.x + 15 +'px'
        let body = document.getElementById('skill_container')
        switch(this.skill_page){
            case "elemental":
                for(let i = 0;i <this.skill_tree.elemental_skills.length; i++){
                    if(this.skill_tree.elemental_skills[i].level > 0){
                        let item = Functions.createElem('div');
                        let image = Functions.createElem('img', false, 'inventoryImage')
                        image.src = this.skill_tree.elemental_skills[i].image_path
                        item.appendChild(image)

                        item.addEventListener('click' , e=>{
                            console.log("!")
                            this.skill_panel[num] = this.skill_tree.elemental_skills[i]
                            this.openTree(true)
                            console.log(this.skill_panel)
                        })

                        container.appendChild(item)
                    }
                }
                break;
        }

        body.appendChild(container)
    }
    takeDamage(count){
        this.current_hp -= count;
    }
    showDiscription(item, e){
        let disc = document.Functions.createElement('div')
        disc.id = 'disc';
        disc.style.top = e.pageY + 'px';
        disc.style.left = e.pageX + 'px';
        disc.innerHTML = item.tooltip()
        let parrent = document.getElementById('skill_container')
        parrent.appendChild(disc)
    }

    closeDiscription(){
        let elem = document.getElementById('disc')
        if(elem){
            elem.parentNode.removeChild(elem)
        }
    }
}



