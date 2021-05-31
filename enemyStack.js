import {Enemy} from './enemy.js'
import { ItemCreator } from "./scripts/items/item_creator.js";
import { Loger } from './loger.js';

export class EnemyStack{
    constructor(world,x,y,stack,q,q_item){        

        this.count_of_enemy = 0
        this.type
        this.enemy = [];
        this.world = world

        this.image = new Image();
        this.pos = {
            "x" : x,
            "y" : y
        }
        this.parseStack(stack);
        if(q){
            this.quest = q
        }
        if(q_item){
            this.quset_item = quset_item
        }
    }

    parseStack(stack){
        
        switch(stack[0]){
            case "s":
                this.drop_chance = 20
                this.image.src = 'units_image/skeleton.png'
                this.type = `undead`
            break;
            case "w":
                this.type = `beast`
                this.drop_chance = 20
                this.image.src = 'units_image/wolf.png'
            break;
            case "sa":
                this.type = `undead`
                this.drop_chance = 20
                this.image.src = 'units_image/skeleton_archer.png'
            break;
            case "fe":
                this.type = `elemental`
                this.drop_chance = 30
                this.image.src = 'units_image/fire_elemental.png'
            break;
        }       

        for(let i = 0; i < stack.length; i++){            
            this.count_of_enemy ++
            switch(stack[i]){
                case "s":                   
                    this.enemy.push(new Enemy('s', i, this, this.world));
                break;
                case "sa":
                    this.enemy.push(new Enemy('sa', i, this, this.world));
                break;
                case "w":
                    this.enemy.push(new Enemy('w', i, this, this.world));
                break;
                case "fe":
                    this.enemy.push(new Enemy('fe', i, this, this.world));
                break;
            }

        }
    }

    delete_enemy(num){
        this.enemy = this.enemy.filter(elem => {
            return elem.num != num
        })
    }

    cellIsEmpty(x,y){
     
    for(let i = 0; i< this.enemy.length; i++){
        let element = this.enemy[i];
        if((element.battlePos.x === x && element.battlePos.y === y)) {
            return false
        }
     }
    if(this.world.player.battlePos.x === x && this.world.player.battlePos.y === y ){
        return false
    }
        return true;
    }

    drop(inv){
        let base_chance = 20
        base_chance += this.drop_chance
        for(let i = 0; i < this.count_of_enemy; i++){
            if(Math.random() * 100 < base_chance){
                let item = ItemCreator.createRandomItem()
                Loger.addLog(`<p>you found ${item.name}</p>`)
                inv.getItem(item)            
                base_chance -= 10
            }
        }
    }
}