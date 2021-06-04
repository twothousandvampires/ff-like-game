import {Weapon} from "./scripts/items/weapon.js";
import { Enchant } from "./enchant.js";
import {Armour} from "./scripts/items/armour.js";
import {jewelry} from "./scripts/items/jewelry.js";

export class EnchantSystem{
	// list of all types
	static type_ench_list = [
		'fire',
		'cold',
		'light',
		'life'
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
		],
		'life' : [
			['life leech', 100]
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
		],
		'life' : [
			['add life', 100]
		]
	}

	static jewelry_ench_list = {
		'fire' : [
			['increase ignite multi', 300],
			['increase fire damage', 300],
		],
		'cold' : [
			['increase cold damage', 300]
		],
		'light' : [
			['increase cold damage', 300]
		],
		'life' : [
			['add life', 100]
		]
	}

	static enchant(item, enchant){

		let count = enchant[1]

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
			let ench;
			let type;

			if(item instanceof Weapon) { ench = EnchantSystem.getElemByWeight(EnchantSystem.weapon_ench_list[ench_type]) ; type = 'weapon' }
			else if(item instanceof Armour) { ench = EnchantSystem.getElemByWeight(EnchantSystem.armour_ench_list[ench_type]) ; type = 'armour' }
			else if(item instanceof jewelry) { ench = EnchantSystem.getElemByWeight(EnchantSystem.jewelry_ench_list[ench_type]) ; type = 'jewelry' }

			if(item.enchants.some( elem =>  elem.name === ench )){
				i--
			}
			else{
				item.enchants.push(new Enchant(ench, type))
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