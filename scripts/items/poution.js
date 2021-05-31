export class Poution{

    constructor(name){

        switch(name){
            case "small_heal_potion":
                this.sell = 2;
                this.buy = 4;
                this.clicked = false
                this.type = 'used';
                this.subtype = 'potion'
                this.power = 10;
                this.name = 'small heal potion'
                this.image_path =  'item_image/small_heal_potion.jpg'
                this.tooltip = `heal you by ${this.power}`;
                this.use = function(player){
                    player.current_hp += this.power;
                    if(player.current_hp > player.max_hp){
                        player.current_hp = player.max_hp
                    }
                }
                break
        }

    }
}