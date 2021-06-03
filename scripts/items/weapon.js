import {EnchantSystem} from "../../enchant_system.js";
import {Functions} from "../../functions.js";

export class Weapon{

    constructor(name, enchanted) {

        console.log('crea')
        this.create(name)
        this.enchants = []
        if(enchanted){
            EnchantSystem.enchant(this, enchanted)
        }
        else {
            if(Math.random() < 0.95){
                let arr_of_ench_count = [
                    [6 , 100],
                    [5 , 200],
                    [4, 500],
                    [3, 1000],
                    [2, 5000],
                    [1, 10000]
                ]
                EnchantSystem.enchant(this, ['all', EnchantSystem.getElemByWeight(arr_of_ench_count)] )
            }
        }
    }

    create(name){
        switch (name){
            case 'short_sword':
                this.sell = 1
                this.buy = 2
                this.type = 'sword'
                this.discription = 'small iron sword'
                this.image_path = 'item_image/pixel_sword.png'
                this.name = 'short sword';
                this.min_damage = 1;
                this.max_damage = 4;
                this.slot = 'left_hand';
                break;
            case 'small_axe':
                this.sell = 1
                this.buy = 1
                this.type = 'axe'
                this.discription = 'small axe'
                this.image_path = 'item_image/small_axe.jpg'
                this.name = 'small axe';
                this.min_damage = 0;
                this.max_damage = 5;
                this.slot = 'left_hand';
                break;
        }

    }

    getTooltip(shop){
        let tooltip = ``;

        tooltip += `<p>${this.name}</p>`

        tooltip += `<p>deal ${this.min_damage} - ${this.max_damage} damage</p>`

        for (let i = 0; i < this.enchants.length; i ++ ){
            tooltip += `<p>${this.enchants[i].tool_tip}</p>`
        }

        if(shop){
            tooltip += `<p>sell : ${this.sell}</p>`
            tooltip += `<p>buy : ${this.buy}</p>`
        }
        return tooltip
    }

    equip(player){
        player.min_damage += this.min_damage
        player.max_damage += this.max_damage
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].equip(player)
        }
    }
    unequip(player){
        player.min_damage -= this.min_damage
        player.max_damage -= this.max_damage
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].unequip(player)
        }
    }
}