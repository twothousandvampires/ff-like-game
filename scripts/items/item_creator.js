import {Weapon} from "./weapon.js";
import {Armour} from "./armour.js";
import {jewelry} from "./jewelry.js";
import {Poution} from "./poution.js";

export class ItemCreator {

        static weapon_list = [
            'short_sword',
            'small_axe'
        ] 
        static armour_list = [
            'leather_helmet',
            'wood_shield'
        ]
        static poution_list = [
            'small_heal_potion'
        ]
        static jewelry_list= [
            'iron_ring'
        ]

    static createRandomWeapon(enchant){
        let name = ItemCreator.weapon_list[Math.floor(Math.random() * ItemCreator.weapon_list.length)]
        return new Weapon(name, enchant)
    }
    static createRandomArmour(enchant){
        let name = ItemCreator.armour_list[Math.floor(Math.random() * ItemCreator.armour_list.length)]
        return new Armour(name, enchant)
    }
    static createRandomjewelry(enchant){
        let name = ItemCreator.jewelry_list[Math.floor(Math.random() * ItemCreator.jewelry_list.length)]
        return new jewelry(name, enchant)
    }
    static createRandomPoution(){
        let name = ItemCreator.poution_list[Math.floor(Math.random() * ItemCreator.poution_list.length)]
        return new Poution(name)
    }

    static createRandomItem(enchanted = false){
        let r = Math.floor(Math.random()*3);
        switch(r){
            case 0 :
                return ItemCreator.createRandomArmour(enchanted)
                break;
            case 1 :
                return ItemCreator.createRandomWeapon(enchanted)
                break;
            case 2 :
                return ItemCreator.createRandomjewelry(enchanted)
                break;
            case 3 :
                return ItemCreator.createRandomPoution(enchanted)
                break;
        }
    }
}