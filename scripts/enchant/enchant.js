enchant(){
    let count = 0
    this.rarety = ``
    let r = Math.floor(Math.random() * 100)
    if(r > 90){
        this.rarety = `extra rare`
        if(Math.random() > 0.5) { count = 5}
        else { count = 6 }
    }
    else if(r > 70){
        this.rarety = `rare`
        if(Math.random() > 0.5) { count = 4}
        else { count = 3 }
    }
    else{
        this.rarety = `magick`
        if(Math.random() > 0.5) { count = 2}
        else { count = 1 }
    }

    for(let i = 0; i < count; i++){
        this.simple_enchant()
    }
}

simple_enchant(){
    let r  = Math.random() * 100
    switch(this.type){
        case 'weapon':
            if(r > 90){
                this.utility_enchant()
            }
            else if(r > 80){
                this.defence_enchant()
            }
            else{
                this.damage_enchant()
            }
            break;
        case 'armour':
            if(r > 90){
                this.utility_enchant()
            }
            else if(r > 80){
                this.damage_enchant()
            }
            else{
                this.defence_enchant()
            }
            break;
        case 'jewerly':
            if(r > 80){
                this.damage_enchant()
            }
            else if(r > 60){
                this.defence_enchant()
            }
            else{
                this.utility_enchant()
            }
            break;
    }

}

damage_enchant(){
    console.log('!!!')
    let r = Math.floor(Math.random() * 3)
    switch(r){
        case 0:
            if(this.cold_damage){
                this.min_cold_damage += Math.floor(Math.random() * (2-1) + 1)
                this.max_cold_damage += Math.floor(Math.random() * (4-2) + 2)
            }
            else{
                this.cold_damage = true
                this.min_cold_damage = Math.floor(Math.random() * (2-1) + 1)
                this.max_cold_damage = Math.floor(Math.random() * (4-2) + 2)
            }
            break;
        case 1:
            if(this.fire_damage){
                this.min_fire_damage += Math.floor(Math.random() * (2-1) + 1)
                this.max_fire_damage += Math.floor(Math.random() * (4-2) + 2)
            }
            else{
                this.fire_damage = true
                this.min_fire_damage = Math.floor(Math.random() * (2-1) + 1)
                this.max_fire_damage = Math.floor(Math.random() * (4-2) + 2)
            }
            break;
        case 2:
            if(this.light_damage){
                this.min_light_damage += Math.floor(Math.random() * (2-1) + 1)
                this.max_light_damage += Math.floor(Math.random() * (4-2) + 2)
            }
            else{
                this.light_damage = true
                this.min_light_damage = Math.floor(Math.random() * (2-1) + 1)
                this.max_light_damage = Math.floor(Math.random() * (4-2) + 2)
            }
            break;
        case 3:
            if(this.phys_damage){
                this.min_phys_damage += Math.floor(Math.random() * (2-1) + 1)
                this.max_phys_damage += Math.floor(Math.random() * (4-2) + 2)
            }
            else{
                this.phys_damage = true
                this.min_phys_damage = Math.floor(Math.random() * (2-1) + 1)
                this.max_phys_damage = Math.floor(Math.random() * (4-2) + 2)
            }
            break;

    }
    this.buy += 2
    this.sell += 1
}

defence_enchant(){
    let r = Math.floor(Math.random() * 5)
    switch(r){
        case 0:
            if(this.cold_res){
                this.cold_res_value += Math.floor(Math.random() * (10-3) + 3)
            }
            else{
                this.cold_res = true
                this.cold_res_value = Math.floor(Math.random() * (10-3) + 3)
            }

            break;
        case 1:
            if(this.fire_res){
                this.fire_res_value += Math.floor(Math.random() * (10-3) + 3)
            }
            else{
                this.fire_res = true
                this.fire_res_value = Math.floor(Math.random() * (10-3) + 3)
            }

            break;
        case 2:
            if(this.light_res){
                this.light_res_value += Math.floor(Math.random() * (10-3) + 3)
            }
            else{
                this.light_res = true
                this.light_res_value = Math.floor(Math.random() * (10-3) + 3)
            }

            break;
        case 3:
            if(this.add_armour){
                this.add_armour_value += Math.floor(Math.random() * (10-3) + 3)
            }
            else{
                this.add_armour = true
                this.add_armour_value = Math.floor(Math.random() * (10-3) + 3)
            }

            break;
        case 4:
            if(this.add_block){
                this.add_block_value += Math.floor(Math.random() * (6-2) + 2)
            }
            else{
                this.add_block = true
                this.add_block_value = Math.floor(Math.random() * (8-4) + 4)
            }

            break;
        case 5:
            if(this.add_evade){
                this.add_evade_value += Math.floor(Math.random() * (6-2) + 2)
            }
            else{
                this.add_evade = true
                this.add_evade_value = Math.floor(Math.random() * (8-4) + 4)
            }

            break;

    }
    this.buy += 2
    this.sell += 1
}

utility_enchant(){

}