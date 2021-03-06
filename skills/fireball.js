import { Loger } from "../loger.js"
import {Enemy} from "../scripts/enemy/enemy.js";
import {Functions} from "../functions.js";
import {Ignite} from "../scripts/Aliment/Ignite.js";

export class Fireball{

	constructor() {
		this.x = 150
		this.y = 500
		this.ignite_power = 1
		this.ignite_chance = 100
		this.name = 'fire ball'
		this.level = 0
		this.image_path =  '/skill_image/fire_ball.png'
		this.fire = true
		this.elemental = true
		this.active_type = 'active'
		this.min_damage = 2
		this.max_damage = 8
		this.mana_cost = 1
		this.requirements = {'elemental_mastery': 1, 'level': 0}
		}
		avalaible(player){
			if(player.level >= this.requirements.level && player.elemental_mastery >= this.requirements.elemental_mastery){
				return true
			}
			return false
		}

		getTooltip(){
			let tooltip = ``
			if(this.level === 0){
				tooltip += `<p>${this.name}</p><p>deal ${this.min_damage} - ${this.max_damage} fire damage</p>`
			}
			else{
				tooltip += `<p>${this.name} level ${this.level}</p><p>deal ${this.min_damage} - ${this.max_damage} fire damage</p>
                    <p>next level ${this.level +1} deal ${this.min_damage + 2} - ${this.max_damage +2} fire damage</p>`
			}
			if(this.ignite_chance != 0 ){
				tooltip += `<p>ignite chance : ${this.ignite_chance}</p>`
			}
			tooltip += `<p>requirements : level - ${this.requirements.level}, elemental mastery - ${this.requirements.elemental_mastery}<p>`
			return tooltip
		}

		can(target){
			return target instanceof Enemy
		}

		getDamage(){
			return Math.floor(Math.random() * (this.max_damage - this.min_damage) + this.min_damage)
		}

		act(player, enemy, stack){
			let d = this.getDamage();
			d = Functions.calcDamage(d, enemy.fire_res)

			Loger.addLog(`<p>${this.name} deal ${d}<p>`)
			enemy.takeDamage(d, player, stack);
			Loger.damageInfo(d, enemy)

			if(Math.random() * 100 < this.ignite_chance + player.add_chance_to_ignite){
				let tick = Math.ceil(d/4 * player.ignite_multi/100)
				enemy.ailments.push(
					new Ignite(tick, player.ignite_duration)
				)
				Loger.addLog(`<p>you ${this.name} ignited ${enemy.name}</p>`)
			}
		}

		levelUp(){
			if(this.level === 0){
				this.level ++;
			}
			else{
				this.level ++;
				this.min_damage += 2
				this.max_damage += 2
			}
		}
		levelDown(){
			if(this.level > 1){
				this.level --;
				this.min_damage -= 2
				this.max_damage -= 2
			}
			else {
				this.level --;
			}
		}
}