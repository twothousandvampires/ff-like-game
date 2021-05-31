import { Loger } from "./loger.js";

export class Enemy{
    constructor(type, i, stack){
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
        switch(type){
            case "s":
                this.type = 'melee'
                this.freezed = false
                this.ailment = []
                this.exp_reward = 2
                this.name = 'skeleton warrior'
                this.block = 10
                this.evade = 5
                this.critacal_chance = 10
                this.critical_multi = 1.3
                this.fire_res = 0;
                this.cold_res = 60;
                this.light_res = 10;
                this.armour = 10;
                this.hp = 10
                this.min_damage = 1;
                this.max_damage = 4;
                this.image.src = 'units_image/skeleton.png'
               
            break;
            case 'sa':
                this.range = 4
                this.type = 'range'
                this.freezed = false
                this.ailment = []
                this.exp_reward = 2
                this.block = 0
                this.evade = 5
                this.critacal_chance = 15
                this.critical_multi = 1.6
                this.name = 'skeleton archer'
                this.fire_res = 0;
                this.cold_res = 30;
                this.light_res = 30;
                this.armour = 0;
                this.hp = 8
                this.min_damage = 1;
                this.max_damage = 3;
                this.image.src = 'units_image/skeleton_archer.png'
                break
            case "w":
                this.type = 'melee'
                this.freezed = false
                this.ailment = []
                this.exp_reward = 1
                this.name = 'wolf'
                this.block = 0
                this.evade = 25
                this.critacal_chance = 15
                this.critical_multi = 1.2
                this.fire_res = 0;
                this.cold_res = 0;
                this.light_res = 0;
                this.armour = 0;
                this.hp = 8
                this.min_damage = 1;
                this.max_damage = 6;
                this.image.src = 'units_image/wolf.png'
            break;
            case "fe":
                this.type = 'caster'
                this.mp = 2
                this.cast = function(player){
                    this.mp --
                    let totalFireDamage = Math.floor(Math.random()  * (12 - 4) + 4);
                    totalFireDamage = Math.ceil(totalFireDamage  - totalFireDamage * (player.fire_res/100))
                    Loger.addLog(`<p>${this.name} fireball deal ${totalFireDamage}<p>`)
                    Loger.damageInfo(totalFireDamage, player)
                    player.takeDamage(totalFireDamage)
                }
                this.freezed = false
                this.ailment = []
                this.exp_reward = 6
                this.name = 'fire elemental'
                this.block = 0
                this.evade = 0
                this.critacal_chance = 10
                this.critical_multi = 1.8
                this.fire_res = 100;
                this.cold_res = 0;
                this.light_res = 0;
                this.armour = 0;
                this.hp = 18
                this.min_fire_damage = 3;
                this.max_fire_damage = 6;
                this.image.src = 'units_image/fire_elemental.png'
            break;     
        }  
    }
    act(player){
        this.check_ailment(player);
        
        if(this.hp > 0){
            if(this.freezed){
                Loger.addLog(`<p>${this.name} frozen and cant move</p>`)
            }
            else{
                switch(this.type){
                    case 'melee':
                        if(Math.abs(player.battlePos.x - this.battlePos.x) <= 1 && Math.abs(player.battlePos.y - this.battlePos.y) <= 1){
                            this.doDamage(player);
                        }
                        else{
                            let x = 0;
                            let y = 0;
                            let deltax = player.battlePos.x - this.battlePos.x;
                            let deltay = player.battlePos.y - this.battlePos.y;
                            
                            x = deltax < 0 ? -1 : 1;
                            y = deltay < 0 ? -1 : 1;
                            if(deltax === 0) x = 0
                            if(deltay === 0) y = 0
                            this.move(x, y)                                                         
                        }
                        break;
                    case "range":                         
                            if(Math.abs(player.battlePos.x - this.battlePos.x) <= 1 && Math.abs(player.battlePos.y - this.battlePos.y) <= 1){
                                this.doDamage(player, 0.5);
                            }
                            else if(Math.abs(player.battlePos.x - this.battlePos.x) <= this.range && Math.abs(player.battlePos.y - this.battlePos.y) <= this.range){
                                this.doDamage(player);
                            }
                            else{
                                let x = 0;
                                let y = 0;
                                let deltax = player.battlePos.x - this.battlePos.x;
                                let deltay = player.battlePos.y - this.battlePos.y;
                                
                                x = deltax < 0 ? -1 : 1;
                                y = deltay < 0 ? -1 : 1;
                                if(deltax === 0) x = 0
                                if(deltay === 0) y = 0
                                this.move(x, y)  
                            }                            
                        break;
                    case "caster":
                            if(this.mp !=0){
                                this.cast(player)
                            }                         
                            else if(Math.abs(player.battlePos.x - this.battlePos.x) <= 1 && Math.abs(player.battlePos.y - this.battlePos.y) <= 1){
                                this.doDamage(player);
                            }
                            else{
                                let x = 0;
                                let y = 0;
                                let deltax = player.battlePos.x - this.battlePos.x;
                                let deltay = player.battlePos.y - this.battlePos.y;
                                
                                x = deltax < 0 ? -1 : 1;
                                y = deltay < 0 ? -1 : 1;
                                if(deltax === 0) x = 0
                                if(deltay === 0) y = 0
                                this.move(x, y)  
                            }                            
                        break;
                }   
            }
            return true
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
        console.log(this.stack.battle_cells[this.battlePos.y + y][this.battlePos.x + x])
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
        for(let i = 0; i < this.ailment.length; i ++){
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
        let totalPhysDamage = 0;
        let totalColdDamage = 0;
        let totalFireDamage = 0;
        let totalLightDamage = 0;

        if(this.min_damage){
            totalPhysDamage = Math.floor(Math.random()  * (this.max_damage - this.min_damage+ 1) + this.min_damage);      
            totalPhysDamage = Math.ceil(totalPhysDamage  - totalPhysDamage * (player.armour/100))
        }

        if(this.min_cold_damage){
            totalColdDamage = Math.floor(Math.random()  * (this.max_cold_damage - this.min_cold_damage+1) + this.min_cold_damage);
            totalColdDamage = Math.ceil(totalColdDamage  - totalColdDamage * (player.cold_res/100))
        }
        if(this.min_fire_damage){
            totalFireDamage = Math.floor(Math.random()  * (this.max_fire_damage - this.min_fire_damage+1) + this.min_fire_damage);
            totalFireDamage = Math.ceil(totalFireDamage  - totalFireDamage * (player.fire_res/100))
            console.log(totalFireDamage)
        }
        if(this.min_light_damage){             
            totalLightDamage = Math.floor(Math.random()  * (this.max_light_damage - this.min_light_damage+1) + this.min_light_damage);
            totalLightDamage = Math.ceil(totalLightDamage  - totalLightDamage * (player.light_res/100))
        }
         
        let totalDamage = totalColdDamage + totalPhysDamage + totalFireDamage + totalLightDamage;
        console.log(totalFireDamage)
        if(Math.random() * 100 < player.block){
            Loger.addLog(`<p class = 'bluetext'>you blocked ${this.name} attack</p>`)
        }
        else if(Math.random() * 100 < player.evade){
            Loger.addLog(`<p class = 'bluetext'>you evaded ${this.name} attack<p>`)
        }
        else{
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
}
