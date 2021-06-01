import { Loger } from "../../loger.js";
import {Functions} from "../../functions.js";

export class Enemy{
    constructor(i, stack){
        this.ailments = []
        this.freezed = false
        this.min_cold_damage = 0;
        this.max_cold_damage = 0;
        this.min_fire_damage = 0;
        this.max_fire_damage = 0;
        this.min_light_damage = 0;
        this.max_light_damage = 0;
        this.stack = stack
        this.num = i
        this.image = new Image()
        this.battlePos = {
            "x" : undefined,
            "y" : undefined
        }
        if( i == 0){
            this.battlePos.x = 5
            this.battlePos.y = 0
        }
        else if( i == 1){
            this.battlePos.x = 5
            this.battlePos.y = 3
        }
        else if( i == 2){
            this.battlePos.x = 5
            this.battlePos.y = 6
        }
        else if(i == 3){
            this.battlePos.x = 6
            this.battlePos.y = 0
        }
        else if(i == 4){
            this.battlePos.x = 6
            this.battlePos.y = 3
        }
        else if(i == 5){
            this.battlePos.x = 6
            this.battlePos.y = 6
        }
    }
    move(x, y){                
    if(!this.check(x, y)){
        if(x === 0 && y === -1){
            if(this.check(x - 1, y)) return
            if(this.check(x + 1, y)) return
        }
        else if(x === 0 && y === 1){
            if(this.check(x - 1, y)) return
            if(this.check(x + 1, y)) return
        }
        else if(x === -1 && y === 0){
            if(this.check(x, y +1)) return
            if(this.check(x, y -1)) return
        }
        else if(x === 1 && y === 0){
            if(this.check(x, y +1)) return
            if(this.check(x, y -1)) return
        }
        else if(x === -1 && y === -1){
            if(this.check(x + 1, y)) return
            if(this.check(x , y + 1)) return
        }
        else if(x === -1 && y === 1){
            if(this.check(x, y - 1)) return
            if(this.check(x + 1, y)) return
        }
        else if(x === 1 && y === 1){
            if(this.check(x, y - 1)) return
            if(this.check(x - 1, y)) return
        }
        else if(x === 1 && y === -1){
            if(this.check(x, y + 1)) return
            if(this.check(x - 1, y)) return
        }
    }
    }   
    check(x, y){
    if(this.stack.cellIsEmpty(this.battlePos.x + x,  this.battlePos.y + y)){
        if(this.stack.battle_cells[this.battlePos.y + y][this.battlePos.x + x]){
            if(this.stack.battle_cells[this.battlePos.y + y ][this.battlePos.x + x ].type != 2){
                this.battlePos.x += x
                this.battlePos.y += y
                return true
            }
        }
    }
    else{
        return true
    }
    return false
    }

    check_ailment(player){
        for(let i = 0; i < this.ailments.length; i ++){
            switch(this.ailment[i].type){
                case `ignite`:
                    this.hp -= this.ailment[i].power
                    Loger.addLog(`<p>ignite deal ${this.ailment[i].power} damage</p>`)
                    if(this.hp <= 0){
                        this.die(player, this.stack)
                    }
                    this.ailment[i].duration --
                    if(this.ailment[i].duration === 0){
                        this.ailment = this.ailment.filter( elem =>{
                            return elem != this.ailment[i]
                        })
                    }
                    break;
                case 'freeze':
                    if(this.ailment[i].duration === 0){
                        this.freezed = false
                        this.ailment = this.ailment.filter( elem =>{
                            return elem != this.ailment[i]
                        })
                    }
                    else{
                        this.freezed = true
                        this.ailment[i].duration --
                    }
                    break;
            }
        }
        return this.hp > 0
    }
    die(player,stack){
        Loger.addLog(`<p>${this.name} died</p>`)
        player.addExp(this.exp_reward)
        stack.delete_enemy(this.num)
    }
    takeDamage(damage, player, stack){
        this.hp -= damage
        if(this.hp <=0){
            this.die(player, stack)
        }
    }
    doDamage(player, less){

        if(Math.random() * 100 < player.block){
            Loger.addLog(`<p class = 'bluetext'>you blocked ${this.name} attack</p>`)
            return
        }
        else if(Math.random() * 100 < player.evade){
            Loger.addLog(`<p class = 'bluetext'>you evaded ${this.name} attack<p>`)
            return
        }
        let totalPhysDamage = 0;
        let totalColdDamage = 0;
        let totalFireDamage = 0;
        let totalLightDamage = 0;

        if(this.min_damage){
            let armour = player.armour > 90 ? 90 : player.armour
            totalPhysDamage = Functions.calcDamage(Functions.getRandomInt(this.max_damage, this.min_damage), armour)
        }

        if(this.min_cold_damage){
            let res = player.cold_res > 75 ? 75 : player.cold_res
            totalColdDamage = Functions.calcDamage(Functions.getRandomInt(this.max_cold_damage, this.min_cold_damage), res);
        }
        if(this.min_fire_damage){
            let res = player.fire_res > 75 ? 75 : player.fire_res
            totalFireDamage = Functions.calcDamage(Functions.getRandomInt(this.max_fire_damage, this.min_fire_damage), res);
        }
        if(this.min_light_damage){
            let res = player.light_res > 75 ? 75 : player.light_res
            totalLightDamage = Functions.calcDamage(Functions.getRandomInt(this.max_light_damage, this.min_light_damage), res);
        }
         
        let totalDamage = totalColdDamage + totalPhysDamage + totalFireDamage + totalLightDamage;

        if(Math.random() * 100 < this.critical_chance){
            totalDamage = Math.ceil(totalDamage * this.crirical_multi)
            Loger.addLog(`<p>CRITICAL!</p>`)
        }
        if(less){
            totalDamage = totalDamage * less
        }
        Loger.damageInfo(totalDamage, player)
        player.takeDamage(totalDamage)
        Loger.addLog(`<p class = 'redtext'>${this.name} deal ${totalDamage} damage</p>`)
        }

}
