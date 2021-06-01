import {Enemy} from "./enemy.js";
import {Loger} from "../../loger.js";

export class Wolf extends Enemy {

    constructor(i, stack) {
        super(i, stack);
        this.type = 'melee'
        this.freezed = false
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
    }

    act(player) {
        if (this.check_ailment(player)) {
            if(this.freezed) {
                Loger.addLog(`<p>${this.name} frozen and cant move</p>`)
            } else {
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