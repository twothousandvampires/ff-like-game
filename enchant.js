export class Enchant{

	constructor(type, item_type) {
		this.name = type
		switch (item_type){
			case 'weapon':
				switch ( type ){
					case 'fire damage':
						this.between = [
							'min_fire_damage',
							'max_fire_damage'
						]
						this.type = 'fire'
						this.min = Math.floor(Math.random() * (3 - 1) + 1)
						this.max = Math.floor(Math.random() + (7 -4) + 4)
						this.type = 'between'
						this.tool_tip = `add ${this.min} - ${this.max} fire damage`
						break;
					case 'cold damage':
						this.between = [
							'min_cold_damage',
							'max_cold_damage'
						]
						this.min = Math.floor(Math.random() * (3 - 1) + 1)
						this.max = Math.floor(Math.random() + (7 -4) + 4)
						this.type = 'between'
						this.tool_tip = `add ${this.min} - ${this.max} cold damage`
						break;
					case 'light damage':
						this.between = [
							'min_light_damage',
							'max_light_damage'
						]
						this.min = Math.floor(Math.random() * (3 - 1) + 1)
						this.max = Math.floor(Math.random() + (7 -4) + 4)
						this.type = 'between'
						this.tool_tip = `add ${this.min} - ${this.max} light damage`
						break;
					case 'fire res':
						this.type = 'fire'
						this.target = 'fire_res'
						this.value = Math.floor(Math.random() * (6 - 1) + 1)
						this.type = 'single'
						this.tool_tip = `add ${this.value} fire res`
						break;
					case 'cold res':
						this.target = 'cold_res'
						this.value = Math.floor(Math.random() * (6 - 1) + 1)
						this.type = 'single'
						this.tool_tip = `add ${this.value} cold res`
						break;
					case 'light res':
						this.target = 'light_res'
						this.value = Math.floor(Math.random() * (6 - 1) + 1)
						this.type = 'single'
						this.tool_tip = `add ${this.value} lightning res`
						break;
					case 'life leech':
						this.target = 'melle_ll'
						this.value = Math.floor(Math.random() * (8 - 2) + 2)
						this.type = 'single'
						this.tool_tip = `${this.value} % of dealt melee damage leached as life`
						break;
				}
				break;
			case 'armour':
				switch (type){
					case 'cold res':
						this.target = 'cold_res'
						this.value = Math.floor(Math.random() * (16 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `add ${this.value} cold res`
						break;
					case 'fire res':
						this.target = 'fire_res'
						this.value = Math.floor(Math.random() * (16 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `add ${this.value} fire res`
						break;
					case 'light res':
						this.target = 'light_res'
						this.value = Math.floor(Math.random() * (16 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `add ${this.value} lightning res`
						break;
					case 'add life':
						this.target = 'max_hp'
						this.value = Math.floor(Math.random() * (2 - 1) + 1)
						this.type = 'single'
						this.tool_tip = `add ${this.value} life`
						this.add_eq_action = function (player){
							player.current_hp += this.value
						}
						this.add_uneq_action = function (player){
							player.current_hp -= this.value
							if(player.current_hp < 0){
								player.current_hp = 1
							}
						}
						break;
				}
				break;
			case 'jewelry':
				switch (type){
					case 'increase fire damage':
						this.target = 'incr_fire_damage'
						this.value = Math.floor(Math.random() * (10 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `increase fire damage by ${this.value} %`
						break;
					case 'increase cold damage':
						this.target = 'incr_cold_damage'
						this.value = Math.floor(Math.random() * (10 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `increase cold damage by ${this.value} %`
						break;
					case 'increase light damage':
						this.target = 'incr_light_damage'
						this.value = Math.floor(Math.random() * (10 - 5) + 5)
						this.type = 'single'
						this.tool_tip = `increase lightning damage by ${this.value} %`
						break;
					case 'add life':
						this.target = 'max_hp'
						this.value = Math.floor(Math.random() * (2 - 1) + 1)
						this.type = 'single'
						this.tool_tip = `add ${this.value} life`
						this.add_eq_action = function (player){
							player.current_hp += this.value
						}
						this.add_uneq_action = function (player){
							player.current_hp -= this.value
							if(player.current_hp < 0){
								player.current_hp = 1
							}
						}
						break;
					case 'increase ignite multi':
						this.target = 'ignite_multi'
						this.value = Math.floor(Math.random() * (25 - 10) + 10)
						this.type = 'single'
						this.tool_tip = `increase ignite multiplier by ${this.value} %`
						break;
				}
				break;
		}
	}

	equip(player){
		switch (this.type){
			case 'between':
				player[this.between[0]] += this.min
				player[this.between[1]] += this.max
				break;
			case 'single':
				player[this.target] += this.value
				break;
		}
		if(this.add_eq_action){
			this.add_eq_action(player)
		}
	}
	unequip(player){
		switch (this.type){
			case 'between':
				player[this.between[0]] -= this.min
				player[this.between[1]] -= this.max
				break;
			case 'single':
				player[this.target] -= this.value
				break;
		}
		if(this.add_uneq_action){
			this.add_uneq_action(player)
		}
	}
}