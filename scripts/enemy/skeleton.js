import {Enemy} from "./enemy.js";
import {Loger} from "../../loger.js";

export class Skeleton extends Enemy{

    constructor(i, stack) {
        super(i, stack);
        this.type = 'melee'
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
        this.image.src = '././units_image/skeleton.png'
    }

    act(player) {
        if(this.check_ailment(player)){
            if(this.freezed) {
                Loger.addLog(`<p>${this.name} frozen and cant move</p>`)
            }
            else{
                if (Math.abs(player.battlePos.x - this.battlePos.x) <= 1 && Math.abs(player.battlePos.y - this.battlePos.y) <= 1) {
                    this.doDamage(player);
                } else {
                    let x = 0;
                    let y = 0;
                    let deltax = player.battlePos.x - this.battlePos.x;
                    let deltay = player.battlePos.y - this.battlePos.y;
                    x = deltax < 0 ? -1 : 1;
                    y = deltay < 0 ? -1 : 1;
                    if (deltax === 0) x = 0
                    if (deltay === 0) y = 0
                    this.move(x, y)
                }
            }
        }
        return true
    }
}