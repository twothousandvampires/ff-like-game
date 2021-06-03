import {EnchantSystem} from "../../enchant_system.js";

export class Armour{

    constructor(name, enchanted) {
        console.log('armour')
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
                EnchantSystem.enchant(this, ['all', EnchantSystem.getElemByWeight(arr_of_ench_count)])
            }
        }
    }

    create(name){
        switch (name){
            case 'leather_helmet':
                this.sell = 1
                this.buy = 2
                this.type = 'helm'
                this.discription = 'leather helmet'
                this.image_path =' item_image/leather_helmet.png'
                this.name = 'leather helmet';
                this.armour = 1;
                this.slot = 'head';
                break;
            case 'wood_shield':
                this.armour = 2
                this.add_block_value = 10
                this.sell = 3
                this.buy = 5
                this.type = 'shield'
                this.discription = 'wood shield'
                this.image_path =' item_image/wood_shield.png'
                this.name = 'wood shield';
                this.slot = 'right_hand';
                break;
        }
    }
    equip(player) {
        if(this.type === 'shield'){
            player.block += this.add_block_value
        }
        player.armour += this.armour
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].equip(player)
        }
    }
    unequip(player) {
        if(this.type === 'shield'){
            player.block -= this.add_block_value
        }
        player.armour -= this.armour
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].unequip(player)
        }
    }
    getTooltip(shop){
        let tooltip = ``;

        tooltip += `<p>${this.name}</p>`
        if(this.type === 'shield'){
            tooltip += `<p>block chance ${this.add_block_value}</p>`
        }
        tooltip += `<p>armour ${this.armour}</p>`

        for (let i = 0; i < this.enchants.length; i ++ ){
            tooltip += `<p>${this.enchants[i].tool_tip}</p>`
        }

        if(shop){
            tooltip += `<p>sell : ${this.sell}</p>`
            tooltip += `<p>buy : ${this.buy}</p>`
        }
        return tooltip
    }
}