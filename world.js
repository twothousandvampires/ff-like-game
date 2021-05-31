import {Player} from '/player.js'
import { EnemyStack } from '/enemyStack.js';
import {Dangeon} from '/dangeon.js';
import {Town} from '/town.js'
import { Loger } from './loger.js';
import {Render} from "./render.js";
import {Functions} from "./functions.js";


export class World {

    constructor(w, h, game){
        this.dangeon = false
        this.current_dangeon = undefined
        this.water_cell = []
        this.forest_cells = []
        this.field_cell = []
        this.plan = []
        this.player = new Player(this)
        this.game = game
        this.towns = [];
        this.enemy = [];
        this.enemy.push(new EnemyStack(this, 10,10,['s','s','s','sa']))
        this.enemy.push(new EnemyStack(this, 4,5,['sa','s','s','sa']))
        this.enemy.push(new EnemyStack(this, 12,12,['s']))
        this.enemy.push(new EnemyStack(this, 4,4,['fe','fe']))
        this.enemy.push(new EnemyStack(this, 2,2,['w','w','w'], 'kill the wolfs'))
        this.towns.push(new Town(this, 7,5))

        this.dangeons = []
        this.dangeons.push(new Dangeon(11,11,'cave', this))
        this.worldWidth = w;
        this.worldHeight = h;
        this.generateWorldPlan(w, h);
    }

    deleteEnemyStack(enemy){
        Loger.clear()
        //enemy.drop(this.game.inventory)
        if(this.dangeon){
            this.current_dangeon.enemy = this.current_dangeon.enemy.filter(elem =>{
                return elem != enemy
            })
        }
        else {
            this.enemy = this.enemy.filter(elem =>{
                return elem != enemy
            })
        }

    }
    drawLoop(){
        if(!this.dangeon){
            let d = this.collisionWithDangeon()
            if(d){
                this.dangeon = true;
                this.current_dangeon = d
                this.player.pos.x = d.exit_x
                this.player.pos.y = d.exit_y + 1
                return;
            }
            this.drawWorld()
            this.drawEnemy()
            this.drawTowns()
            this.drawPlayer()
            this.drawDangeon()
        }
        else{
            if(this.player.pos.x == this.current_dangeon.exit_x && this.player.pos.y == this.current_dangeon.exit_y){
                this.dangeon = false              
                this.player.pos.x = this.current_dangeon.x
                this.player.pos.y = this.current_dangeon.y +1
                this.current_dangeon = undefined
                return;
            }
            this.drawWorld()
            this.drawEnemy()
            this.drawPlayer()
        }
    }
    drawDangeon(){
        let cord = this.getDrawCord()
        Render.drawDangeonsOnMap(cord, this.dangeons)
    }
    generateWorldPlan(w, h){   
        for(let i = 0; i < w; i ++){
            let cellRow = []
            for(let j = 0; j < h; j++){
                let cell = {
                    'x': j,
                    'y': i,
                    'type': 2,
                    'size': 100,
                }

                this.field_cell.push(cell)
                cellRow.push(cell)

            }
            this.plan.push(cellRow)
        }
        console.log(this.plan)
        this.generateWater(w, h)
        this.generateForest(w , h)

    }
    generateWater(w, h){
        let power = 0
        let count = Functions.getRandomInt(12,6);

        for(let i = 0; i < count;i ++){
            let start = {
                'x' : Math.floor(Math.random() * w),
                'y' : Math.floor(Math.random() * h),
            }
            generate(start.x, start.y, power, this.plan, this.water_cell, this.field_cell)
        }
        function generate(x, y ,power, plan, water_array, field_array){
            if(x <= w && x >= 0 && y <= h && y >= 0 && Math.random() > power  && plan[y] && plan[y][x] && plan[y][x].type === 2){
                //console.log('x : '+ x + " y : " + y)
                // console.log(Math.random() * 0.2)

                plan[y][x].type = 1

                water_array.push([y][x])


                generate(x + 1,y,power + Functions.getRandomInt(0.5) ,plan, water_array, field_array);
                generate(x - 1,y,power + Functions.getRandomInt(0.5) , plan, water_array, field_array);
                generate(x,y + 1,power + Functions.getRandomInt(0.5) , plan, water_array, field_array);
                generate(x,y - 1,power + Functions.getRandomInt(0.5), plan, water_array, field_array);
            }
            else {
                return
            }

        }
    }
    generateForest(w , h){


        let power = 0
        let count = Functions.getRandomInt(12,6);

        for(let i = 0; i < count;i ++){
            let start = {
                'x' : Math.floor(Math.random() * w),
                'y' : Math.floor(Math.random() * h),
            }
            generate(start.x, start.y, power, this.plan, this.forest_cells)
        }
        function generate(x, y ,power, plan, forrest_array){
            if(x <= w && x >= 0 && y <= h && y >= 0 && Math.random() > power  && plan[y] && plan[y][x] && plan[y][x].type === 2){
                //console.log('x : '+ x + " y : " + y)
                   // console.log(Math.random() * 0.2)

                    plan[y][x].type = 0
                    plan[y][x].f_type = Math.floor(Math.random() * 5)
                    forrest_array.push([y,x])


                generate(x + 1,y,power + Functions.getRandomInt(0.2) ,plan, forrest_array);
                generate(x - 1,y,power + Functions.getRandomInt(0.2) , plan, forrest_array);
                generate(x,y + 1,power + Functions.getRandomInt(0.2) , plan, forrest_array);
                generate(x,y - 1,power + Functions.getRandomInt(0.2), plan, forrest_array);
            }
            else {
                return
            }

        }

    }
    drawWorld(){       

        let player_cords = this.getDrawCord()
        if(!this.dangeon){
            Render.drawWorld(player_cords, this.plan);
        }
        else{
            Render.drawDangeon(player_cords, this.current_dangeon.plan)
        }
    }

    drawPlayer(){
        Render.drawPlayer(this.player , this.plan, this.current_dangeon)
    }
    drawEnemy(){
        let cord = this.getDrawCord()
        Render.drawEnemy(this.enemy, cord, this.current_dangeon)
    }
    getDrawCord(){
        let yStart  = this.player.pos.y - 3 
        let yEnd = this.player.pos.y + 4

        if(yStart <= 0){
            yStart = 0;
            yEnd = 7;
        }
        if(!this.dangeon){
            if(yEnd >= this.worldHeight){
                yStart = this.worldHeight-7;
                yEnd = this.worldHeight;
            } 
        }
        else{
            if(yEnd >= this.current_dangeon.plan.length){
                yStart = this.current_dangeon.plan.length - 7;
                yEnd = this.current_dangeon.plan.length;
            } 
        }

        let xStart = this.player.pos.x - 3 
        let xEnd = this.player.pos.x + 4
    
        if(xStart <= 0){
            xStart = 0;
            xEnd = 7;
        }

        if(!this.dangeon){
            if(xEnd >= this.worldWidth){
                xStart = this.worldWidth - 7;
                xEnd = this.worldWidth ;
            }
        }
        else{
            if(xEnd >= this.current_dangeon.plan[0].length){
                xStart = this.current_dangeon.plan[0].length - 7;
                xEnd = this.current_dangeon.plan[0].length ;
            }
        }       
        return {"xStart" : xStart, "xEnd" : xEnd, "yStart" : yStart, "yEnd" : yEnd} 
    }
    collisionWithEnemy(){
            let array_to_col = this.dangeon ? this.current_dangeon.enemy : this.enemy
            for(let i = 0; i < array_to_col.length;i ++){
            if(array_to_col[i].pos.x == this.player.pos.x && array_to_col[i].pos.y == this.player.pos.y){
                return array_to_col[i];
            }
        }
    }
    drawTowns(){       
        let cord = this.getDrawCord()       
        Render.drawTowns(cord, this.towns)
    }
    collisionWithTown(){
        if(!this.dangeon){
            for(let i = 0; i < this.towns.length;i ++){
                if(this.towns[i].x == this.player.pos.x && this.towns[i].y == this.player.pos.y){
                    return this.towns[i];
                }
            }
            return false
        }
        
    }
    collisionWithDangeon(){
        if(!this.dangeon){
            for(let i = 0; i < this.dangeons.length;i ++){
                if(this.dangeons[i].x == this.player.pos.x && this.dangeons[i].y == this.player.pos.y){
                    return this.dangeons[i];
                }
            }
            return false
        }
    }
}
