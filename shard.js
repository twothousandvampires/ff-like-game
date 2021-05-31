export class Shard{


    constructor(type, multi){
        this.name = `shard of ${type}`
        this.image_path = `item_image/shard.png`
        this.type = type
        if(multi){

        }   
        else{
            this.power = 1
        }
    }

    getTooltip(){
        return `<p>${this.name}</p><p>power ${this.power}</p>`
    }
    enchant(item){
        switch(this.type){
            case 'cold':
                item.cold = true;
                if(item.type === 'armour'){
                    item.cold_res = 5 + (this.power * 5)
                }
                else if(item.type === 'weapon'){                   
                    item.min_cold_damage = 0 + this.power
                    item.max_cold_damage = 1 + this.power
                }
                break;
            case 'fire':
                item.fire = true;
                if(item.type === 'armour'){
                    item.fire_res = 5 + (this.power * 5)
                }
                else if(item.type === 'weapon'){                   
                    item.min_fire_damage = 0 + this.power
                    item.max_fire_damage = 1 + this.power
                }
                break;
            case 'light':
                item.light = true;
                if(item.type === 'armour'){
                    item.light_res = 5 + (this.power * 5)
                }
                else if(item.type === 'weapon'){                   
                    item.min_light_damage = 0 + this.power
                    item.max_light_damage = 1 + this.power
                }
                break;
            case 'phys':
                item.phys = true;
                if(item.type === 'armour'){
                    item.add_armour = 2 + (this.power * 2)
                }
                else if(item.type === 'weapon'){                   
                    item.min_phys_damage = 0 + this.power
                    item.max_phys_damage = 1 + this.power
                }
                break;
        }
        
    }
}   