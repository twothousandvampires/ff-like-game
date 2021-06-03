import {Weapon} from "./scripts/items/weapon.js";
import { Enchant } from "./enchant.js";
import {Armour} from "./scripts/items/armour.js";

export class EnchantSystem{

	static type_ench_list = [
		'fire',
		'cold',
		'light'
	]

	static weapon_ench_list = {
		'fire' : [
			'fire damage',
			'fire res',
		],
		'cold' : [
			'cold damage',
			'cold res'
		],
		'light' : [
			'light damage',
			'light res'
		]
	}

	static armour_ench_list = {
		'fire' : [
			'fire res',
		],
		'cold' : [
			'cold res'
		],
		'light' : [
			'light res'
		]
	}

	static enchant(item, enchant){
		console.log(enchant)
		let count = enchant[1] ? enchant[1] : Math.floor(Math.random() * (7 - 1) + 1)

		switch (enchant[0]){
			case 'all':
				EnchantSystem.createRandomEnchant(item, count)
				break;
			case 'fire':
				EnchantSystem.createFireEnchant(item, count)
				break;
			default:
				break;
		}
	}

	static createRandomEnchant(item, count){
		for (let i = 0; i < count; i ++){
			let ench_type = EnchantSystem.type_ench_list[Math.floor(Math.random() * EnchantSystem.type_ench_list.length)]

			if(item instanceof Weapon){
				let ench = EnchantSystem.weapon_ench_list[ench_type][Math.floor(Math.random() * EnchantSystem.weapon_ench_list[ench_type].length)]
				if(item.enchants.some( elem =>  elem.name === ench )){
					i--
				}
				else {
					item.enchants.push(new Enchant(ench, 'weapon'))
				}
			}

			else if(item instanceof Armour){
				let ench = EnchantSystem.armour_ench_list[ench_type][Math.floor(Math.random() * EnchantSystem.armour_ench_list[ench_type].length)]
				if(item.enchants.some( elem =>  elem.name === ench )){
					i--
				}
				else {
					item.enchants.push(new Enchant(ench, 'armour'))
				}
			}
		}
	}

	static createFireEnchant(item, count){
		if(item instanceof Weapon){
			if(!item.enchants.some( elem => elem.type === 'fire')){
				item.enchants.push(new Enchant(EnchantSystem.weapon_ench_list['fire'][Math.floor(Math.random() * EnchantSystem.weapon_ench_list['fire'].length)], 'weapon'))
				if(count - 1 != 0){
					EnchantSystem.createRandomEnchant(item, count - 1)
				}
			}
			else {
				EnchantSystem.createRandomEnchant(item, count )
			}
		}
	}
}