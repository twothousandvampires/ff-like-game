import {EnchantSystem} from "../../enchant_system";

export class jewelry{

    constructor(name, enchanted) {
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
        switch (name) {
            case 'iron_ring':
                this.sell = 4
                this.buy = 2
                this.type = 'ring'
                this.discription = 'iron ring'
                this.image_path =' item_image/iron_ring.png'
                this.name = 'iron ring';
                this.slot = 'ring';
                break;
        }
    }
    equip(player) {
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].equip(player)
        }
    }
    unequip(player) {
        for(let i = 0; i < this.enchants.length; i ++){
            this.enchants[i].unequip(player)
        }
    }
    getTooltip(shop){
        let tooltip = ``;

        tooltip += `<p>${this.name}</p>`

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