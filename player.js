import { Loger } from './loger.js';
import {SkillTree} from './skilltree.js'
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
        this.evade = 5
        this.block = 0
        this.critical_chance = 5
        this.crirical_multi = 1.5
        this.melle_ll = 50
        this.spell_ll = 0

        this.world = world
        this.skill_panel = [{},{},{}]
        this.skill_point = 5
        this.gold = 10;

        this.min_damage = 1
        this.max_damage = 3
        this.min_range_damage = 0
        this.max_range_damage = 0

        this.min_cold_damage = 2;
        this.max_cold_damage = 5;
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
        this.current_hp = Math.round(12 + this.stamina/2 + this.strength/5)
        this.max_hp = Math.round(12 + this.stamina/2 + this.strength/5)
        this.level = 0
        this.exp_for_level = 10
        this.exp = 0

        this.ignite_multi = 100
        this.shock_multi = 100
        this.add_elemental_damage = 0
        this.incr_fire_damage = 0
        this.incr_cold_damage = 0
        this.incr_light_damage = 0

        this.freeze_duration = 2
        this.ignite_duration = 4
        this.add_chance_to_freeze = 0
        this.add_chance_to_ignite = 0
        this.add_chance_to_shock = 0

        this.elemental_mastery = 0

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
                        Game.game = 'skill_tree';
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

    doMelleHit(enemy, stack){

        if(Math.random() * 100 < enemy.block){
            Loger.addLog(`${enemy.name} blocked`)
            return;
        }
        if(Math.random() * 100 < enemy.evade){
            Loger.addLog(`${enemy.name} evaded`)
            return;
        }
        
        let totalPhysDamage = Functions.calcDamage(Math.floor(Math.random()  * (this.max_damage - this.min_damage+1) + this.min_damage), enemy.armour)
        console.log('phys' + totalPhysDamage)

        let totalColdDamage = Functions.calcDamage(Math.floor(Math.random()  * (this.max_cold_damage - this.min_cold_damage+1) + this.min_cold_damage), enemy.cold_res);
        totalColdDamage = Math.round(totalColdDamage * (1 + (this.add_elemental_damage/100 + this.incr_cold_damage/100)))
        console.log('cold' + totalColdDamage)

        let totalFireDamage = Functions.calcDamage(Math.floor(Math.random()  * (this.max_fire_damage - this.min_fire_damage+1) + this.min_fire_damage), enemy.fire_res);
        totalFireDamage = Math.round(totalFireDamage * (1 + (this.add_elemental_damage/100 + this.incr_fire_damage/100)))
        console.log('fire' + totalFireDamage)

        let totalLightDamage = Functions.calcDamage(Math.floor(Math.random()  * (this.max_light_damage - this.min_light_damage+1) + this.min_light_damage), enemy.light_res);
        totalLightDamage = Math.round(totalLightDamage * (1 + (this.add_elemental_damage/100 + + this.incr_light_damage/100)))
        console.log('light' + totalLightDamage)

        let totalDamage = totalColdDamage + totalPhysDamage + totalFireDamage + totalLightDamage

        totalDamage = Math.round(totalDamage  * (1 + this.strength/10))

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

    takeDamage(count){
        this.current_hp -= count;
    }

}



