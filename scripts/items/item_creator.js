import {Weapon} from "./weapon.js";
import {Armour} from "./armour.js";
import {Jewerly} from "./jewerly.js";
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
        static jewerly_list= [
            'iron_ring'
        ]


    // createWeapon(name , enchanted){
    //     return new Item_creator(name)
    // }
    //
    // createArmour(name, enchanted){
    //     return new Item_creator(name)
    // }
    //
    // createJewerly(name, enchanted){
    //     return new Item_creator(name)
    // }
    //
    // createUsed(name){
    //     return new UsedItem(name)
    // }
    //
    static createRandomWeapon(enchant){
        let name = ItemCreator.weapon_list[Math.floor(Math.random() * ItemCreator.weapon_list.length)]
        return new Weapon(name, enchant)
    }
    static createRandomArmour(enchant){
        let name = ItemCreator.armour_list[Math.floor(Math.random() * ItemCreator.armour_list.length)]
        return new Armour(name, enchant)
    }
    static createRandomJewerly(){
        let name = ItemCreator.jewerly_list[Math.floor(Math.random() * ItemCreator.jewerly_list.length)]
        return new Jewerly(name)
    }
    static createRandomPoution(){
        let name = ItemCreator.poution_list[Math.floor(Math.random() * ItemCreator.poution_list.length)]
        return new Poution(name)
    }

    static createRandomItem(enchanted = false){
        let r = Math.floor(Math.random()*2);
        switch(r){
            case 0 :
                return ItemCreator.createRandomArmour(enchanted)
                break;
            case 1 :
                return ItemCreator.createRandomWeapon(enchanted)
                break;
            case 2 :
                return ItemCreator.createRandomPoution()
                break;
            case 3 :
                return ItemCreator.createRandomJewerly()
                break;
        }
    }
}