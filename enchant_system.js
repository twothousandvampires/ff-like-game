import {Weapon} from "./scripts/items/weapon.js";
import { Enchant } from "./enchant.js";
import {Armour} from "./scripts/items/armour.js";

export class EnchantSystem{
	// list of all types
	static type_ench_list = [
		'fire',
		'cold',
		'light'
	]
	// list for weapon with weight
	static weapon_ench_list = {
		'fire' : [
			['fire res', 100],
			['fire damage', 500],
		],
		'cold' : [
			['cold res', 100],
			['cold damage', 500],
		],
		'light' : [
			['light res', 100],
			['light damage', 500],
		]
	}

	static armour_ench_list = {
		'fire' : [
			['fire res', 700],
		],
		'cold' : [
			['cold res', 700]
		],
		'light' : [
			['light res' , 700]
		]
	}

	static enchant(item, enchant){

		let count = enchant[1]

		console.log(count)
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
				let ench = EnchantSystem.getElemByWeight(EnchantSystem.weapon_ench_list[ench_type])
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

	static getElemByWeight(arr){
		let random = Math.floor(Math.random() * (arr[arr.length-1][1] - arr[0][1]) + arr[0][1])
		for (let i = 0; i < arr.length; i++){
			if(random <= arr[i][1]){
				return arr[i][0]
			}
		}
	}
}