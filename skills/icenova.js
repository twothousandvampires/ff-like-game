import {Loger} from "../loger.js";

export class Icenova{

	constructor() {

		this.chance_to_freeze = 20
		this.name = 'ice nova'
		this.level = 0
		this.x = 350
		this.y = 500
		this.cold = true
		this.elemental = true

		this.min_damage = 1
		this.max_damage = 3
		this.mana_cost = 2
		this.requirements = {'level' : 0}
		this.image_path = '/skill_image/frost_circle.png'
		this.active_type = 'active'
	}

	avalaible(player){
		if(player.level >= this.requirements.level){
			return true
		}
		return false
	}

	can(target){
		return true
	}
	get_damage(){
		return Math.floor(Math.random() * (this.max_damage - this.min_damage) + this.min_damage)
	}
	act(player, enemy, stack){
		let x = player.battlePos.x
		let y = player.battlePos.y
		for(let ystart = y - 1; ystart <= y + 1; ystart++){
			for(let xstart = x - 1; xstart <= x + 1; xstart ++){
				for(let i = 0; i < stack.enemy.length; i++){
					if(stack.enemy[i].battlePos.y === ystart && stack.enemy[i].battlePos.x === xstart){
						let d = this.get_damage()
						stack.enemy[i].hp -= d;
						if(Math.random() * 100 < this.chance_to_freeze){
							stack.enemy[i].ailment.push(
								{
									'type' : 'freeze',
									'duration' : 2
								})
						}
						if(stack.enemy[i].hp <= 0){
							stack.enemy[i].die(player,stack)
						}
						Loger.addLog(`<p>${this.name} deal ${d} damage</p>`)
						Loger.damageInfo(d, stack.enemy[i])
					}
				}
			}
		}
	}
	levelUp(){
		if(this.level === 0){
			this.level ++;
		}
		else{
			this.level ++;
			this.min_damage += 1
			this.max_damage += 1
		}
	}
	getTooltip(){
		let tooltip = ``
		if(this.level === 0){
			tooltip += `<p>${this.name}</p><p>deal ${this.min_damage} - ${this.max_damage} cold damage</p>`
		}
		else{
			tooltip += `<p>${this.name} level ${this.level}</p><p>deal ${this.min_damage} - ${this.max_damage} cold damage</p>
                    <p>next level ${this.level +1} deal ${this.min_damage + 1} - ${this.max_damage +1} cold damage</p>`
		}
		if(this.chance_to_freeze != 0 ){
			tooltip += `<p>freeze chance : ${this.chance_to_freeze}</p>`
		}
		return tooltip
	}
}