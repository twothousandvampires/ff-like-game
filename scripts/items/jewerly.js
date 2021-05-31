export class Jewerly{

    constructor(name, enchanted) {
        this.create(name, enchanted)
    }

    create(name, enchanted){
        switch (name) {
            case 'iron_ring':
                this.sell = 4
                this.buy = 2
                this.type = 'jewerly'
                this.discription = 'iron ring'
                this.image_path =' item_image/iron_ring.png'
                this.name = 'iron ring';
                this.slot = 'ring';
                break;
        }
    }
    equip(player) {



        if(this.cold_res){
            player.cold_res += this.cold_res_value
        }
        if(this.fire_res){
            player.fire_res += this.fire_res_value
        }
        if(this.light_res){
            player.light_res += this.light_res_value
        }
        if(this.add_armour){
            player.armour += this.add_armour_value
        }
        if(this.cold_damage){
            player.min_cold_damage += this.min_cold_damage
            player.max_cold_damage += this.max_cold_damage
        }
        if(this.fire_damage){
            player.min_fire_damage += this.min_fire_damage
            player.max_fire_damage += this.max_fire_damage
        }
        if(this.light_damage){
            player.min_light_damage += this.min_light_damage
            player.max_light_damage += this.max_light_damage
        }
        if(this.phys_damage){
            player.min_damage += this.min_phys_damage
            player.max_damage += this.max_phys_damage
        }
        if(this.add_block){
            player.block += this.add_block_value
        }
        if(this.add_evade){
            player.evade += this.add_evade_value
        }
    }
    unequip(player) {

        if(this.cold_res){
            player.cold_res -= this.cold_res_value
        }
        if(this.fire_res){
            player.fire_res -= this.fire_res_value
        }
        if(this.light_res){
            player.light_res -= this.light_res_value
        }
        if(this.add_armour){
            player.armour -= this.add_armour_value
        }
        if(this.cold_damage){
            player.min_cold_damage -= this.min_cold_damage
            player.max_cold_damage -= this.max_cold_damage
        }
        if(this.fire_damage){
            player.min_fire_damage -= this.min_fire_damage
            player.max_fire_damage -= this.max_fire_damage
        }
        if(this.light_damage){
            player.min_light_damage -= this.min_light_damage
            player.max_light_damage -= this.max_light_damage
        }
        if(this.phys_damage){
            player.min_damage -= this.min_phys_damage
            player.max_damage -= this.max_phys_damage
        }
        if(this.add_block){
            player.block -= this.add_block_value
        }
        if(this.add_evade){
            player.evade -= this.add_evade_value
        }
    }
    // getTooltip(shop){
    //     let tooltip = ``;
    //
    //     tooltip += `<p>${this.name}</p>`
    //         `
    //
    //     if(this.cold_damage) { tooltip += `<p class ='bluetext'>add ${this.min_cold_damage} - ${this.max_cold_damage} cold damage</p>`}
    //     if(this.fire_damage) { tooltip += `<p class ='redtext'>add ${this.min_fire_damage} - ${this.max_fire_damage} fire damage</p>`}
    //     if(this.light_damage) { tooltip += `<p class ='goldtext'>add ${this.min_light_damage} - ${this.max_light_damage} lightning damage</p>`}
    //     if(this.phys_damage) { tooltip += `<p>add ${this.min_phys_damage} - ${this.max_phys_damage} physical damage</p>`}
    //
    //     if(this.fire_res) { tooltip += `<p class ='redtext'>add ${this.fire_res_value} fire res</p>`}
    //     if(this.light_res) { tooltip += `<p class ='goldtext'>add ${this.light_res_value} lightning res</p>`}
    //     if(this.add_armour) { tooltip += `<p class ='goldtext'>add ${this.add_armour_value} armour</p>`}
    //     if(this.cold_res) { tooltip += `<p class ='bluetext'>add ${this.cold_res_value} cold res</p>`}
    //
    //     if(this.add_block) { tooltip += `<p class ='graytext'>add ${this.add_block_value} block chance</p>`}
    //     if(this.add_evade) { tooltip += `<p class ='graytext'>add ${this.add_evade_value} evade chance</p>`}
    //
    //     if(shop){
    //         tooltip += `<p>sell : ${this.sell}</p>`
    //         tooltip += `<p>buy : ${this.buy}</p>`
    //     }
    //     return tooltip
    // }
}