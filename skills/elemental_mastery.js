import {Functions} from "../functions";
import {Enemy} from "../scripts/enemy/enemy";
import {Loger} from "../loger.js";

export class ElementalMastery{

	constructor() {
		this.x = 550
		this.y = 500
		this.add_elem_damage = 5
		this.add_chance_to_ailments = 3
		this.name = 'elemental mastery'
		this.level = 0
		this.image_path =  '/skill_image/elem_mast.png'
		this.fire = true
		this.elemental = true
		this.active_type = 'passive'
		this.requirements = {'level': 0}
	}
	avalaible(player){
		if(player.level >= this.requirements.level){
			return true
		}
		return false
	}

	getTooltip(){
		let tooltip = ``
		if(this.level === 0){
			tooltip += `<p>${this.name}</p><p>increase elemental damage by ${this.add_elem_damage}%. Increase chance to freeze, ignite, shock by ${this.add_chance_to_ailments}%</p>`
		}
		else{
			tooltip += `<p>${this.name}</p><p>increase elemental damage by ${this.add_elem_damage}. Increase chance to freeze, ignite, shock by ${this.add_chance_to_ailments}</p>
                    <p>next level ${this.level +1} <p>${this.name}</p><p>increase elemental damage by ${this.add_elem_damage + 5}. Increase chance to freeze, ignite, shock by ${this.add_chance_to_ailments + 3}</p>`
		}
		return tooltip
	}

	levelUp(player){
		if(this.level === 0){
			this.level +=1
			player.elemental_mastery ++
			player.add_chance_to_freeze += this.add_chance_to_ailments
			player.add_chance_to_ignite += this.add_chance_to_ailments
			player.add_chance_to_shock += this.add_chance_to_ailments
			player.add_elemental_damage  += this.add_elem_damage
		}
		else {
			this.level += 1
			player.elemental_mastery ++
			player.add_chance_to_freeze += this.add_chance_to_ailments
			player.add_chance_to_ignite += this.add_chance_to_ailments
			player.add_chance_to_shock += this.add_chance_to_ailments
			player.add_elemental_damage  +=this.add_elem_damage

			this.add_chance_to_ailments += 3
			this.add_elem_damage += 5
		}

	}
	levelDown(player){
		player.elemental_mastery --
		this.level --
		player.add_chance_to_freeze -= this.add_chance_to_ailments
		player.add_chance_to_ignite -= this.add_chance_to_ailments
		player.add_chance_to_shock -= this.add_chance_to_ailments
		player.add_elemental_damage  -=this.add_elem_damage

		this.add_chance_to_ailments -= 3
		this.add_elem_damage -= 5
	}

}