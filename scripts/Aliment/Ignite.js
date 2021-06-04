import {Ailment} from "./Ailment.js";
import {Loger} from "../../loger";

export class Ignite extends Ailment{

	constructor( tick, duration) {
		super();
		this.tick = tick
		this.duration = duration
	}

	enemyAct(player, enemy){

		Loger.addLog(`<p>${enemy.name} burning</p>`)
		Loger.damageInfo(`ignite ${this.tick}`, enemy)
		enemy.takeDamage(this.tick, player, enemy.stack)
		this.duration --
		if(this.duration === 0){
			enemy.ailments = enemy.ailments.filter( elem => {
				return elem !== this
			})
		}

	}

}