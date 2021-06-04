import {Ailment} from "./Ailment.js";
import {Loger} from "../../loger";

export class Freeze{

	constructor(duration) {
		this.duration = duration
	}


	enemyAct(player, enemy){

		enemy.freezed = true
		if(this.duration === 0){
			enemy.freezed = false
			enemy.ailments = enemy.ailments.filter( elem => {
				return elem !== this
			})
		}
		if(enemy.freezed){
			Loger.damageInfo(`freezed`, enemy)
		}
		this.duration --
	}

}