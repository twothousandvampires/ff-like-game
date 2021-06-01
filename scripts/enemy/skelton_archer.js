import {Enemy} from "./enemy.js";
import {Loger} from "../../loger.js";

export class SkeletonArcher extends Enemy {

    constructor(i, stack) {
        super(i, stack);
        this.range = 4
        this.type = 'range'
        this.freezed = false
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
    }

    act(player) {
        if (this.check_ailment(player)) {
            if (this.freezed) {
                Loger.addLog(`<p>${this.name} frozen and cant move</p>`)
            } else {
                if (Math.abs(player.battlePos.x - this.battlePos.x) <= 1 && Math.abs(player.battlePos.y - this.battlePos.y) <= 1) {
                    this.doDamage(player, 0.5);
                } else if (Math.abs(player.battlePos.x - this.battlePos.x) <= this.range && Math.abs(player.battlePos.y - this.battlePos.y) <= this.range) {
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