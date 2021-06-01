import {Enemy} from "./enemy.js";
import {Loger} from "../../loger.js";

export class FireElemental extends Enemy {

    constructor(i, stack) {
        super(i, stack);
        this.type = 'caster'
        this.mp = 2
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
    }
    cast(player){
        this.mp --
        let totalFireDamage = Math.floor(Math.random()  * (12 - 4) + 4);
        totalFireDamage = Math.ceil(totalFireDamage  - totalFireDamage * (player.fire_res/100))
        Loger.addLog(`<p>${this.name} fireball deal ${totalFireDamage}<p>`)
        Loger.damageInfo(totalFireDamage, player)
        player.takeDamage(totalFireDamage)
    }
    act(player) {
        if(this.check_ailment(player)){
            if(this.freezed){
                Loger.addLog(`<p>${this.name} frozen and cant move</p>`)
            }
            else{
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
            }
        }
        return true
    }
}