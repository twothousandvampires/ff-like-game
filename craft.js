import { Shard } from "./shard.js"
import {ItemCreator} from "./scripts/items/item_creator.js";
import { Loger } from './loger.js'

export class Craft{

    constructor(world, inv){

        this.world = world
        this.player = world.player
        this.inventory = inv

        this.clicked_item = undefined
        this.disenchant_slot = undefined
        this.enchant_slot = undefined
        this.enchant_shard = undefined

    }


    open(reopen = false){
        
        
        if(!ItemCreator_open || reopen){
            let to_delete = document.getElementById('craft_container')
            if(to_delete){
                to_delete.parentNode.removeChild(to_delete)
            }
            ItemCreator_open = true
            let body = document.getElementById('body')

            let container = document.createElement('div')
            container.id = 'craft_container'
            

            
            let disenchant =  document.createElement('div');

            let disenchant_slot = document.createElement('div')

            let go_dis = document.createElement('div')
            go_dis.innerText  = 'disechant'
            disenchant.appendChild(go_dis)
            go_dis.addEventListener('click', e=>{
                if(this.disenchant_slot){
                    this.disenchant(this.disenchant_slot)
                }
            })
            
            let dis_image = document.createElement('img')
            dis_image.src = this.disenchant_slot ? this.disenchant_slot.image_path : 'item_image/empty_slot.png'
            dis_image.classList = 'inventoryImage'
            disenchant_slot.appendChild(dis_image)
            
            dis_image.style.border = 'solid 2px blue'
            dis_image.addEventListener('click', e =>{               
                if(this.clicked_item){
                    if(this.disenchant_slot != undefined){
                        this.inventory.itemPull.push(this.disenchant_slot)
                        this.disenchant_slot = this.clicked_item    
                        this.inventory.itemPull.splice(this.clicked_item.num, 1)                    
                        this.clicked_item = undefined
                        this.open(true)
                    }
                    else{
                        this.disenchant_slot = this.clicked_item                    
                        this.inventory.itemPull.splice(this.clicked_item.num, 1)  
                        this.clicked_item = undefined
                        this.open(true)
                    }                    
                }
                else{
                    if(this.disenchant_slot){
                        this.inventory.itemPull.push(this.disenchant_slot)
                        this.disenchant_slot = undefined
                        this.open(true)
                    }                 
                }
            })
            



            /////
            let inv = document.createElement('div')
            for(let i = 0; i < this.inventory.itemPull.length; i++){
                let item = document.createElement('div')
                
                let img = document.createElement('img')
                img.classList = 'inventoryImage'
                img.src = this.inventory.itemPull[i].image_path
                item.appendChild(img)
                this.inventory.itemPull[i].num = i
                item.addEventListener('click' , e=>{
                    this.clicked_item = this.inventory.itemPull[i]
                })
                item.addEventListener('mouseenter', e=>{
                    this.showDiscription(this.inventory.itemPull[i],e)
                })
                item.addEventListener('mouseleave', e=>{
                    this.closeDiscription()
                })
                inv.appendChild(item)
            }
            disenchant.appendChild(disenchant_slot)
            ////



            let enchant_container = document.createElement('div')

            let enchant_slot = document.createElement('div')
            let enchant_shard = document.createElement('div')

            let enchant_slot_img = document.createElement('img')
            let enchant_shard_img = document.createElement('img')

            enchant_slot.addEventListener('click', e =>{
                if(this.clicked_item && this.clicked_item instanceof Item){
                    if(this.enchant_slot != undefined){
                        this.inventory.itemPull.push(this.enchant_slot)
                        this.enchant_slot = this.clicked_item    
                        this.inventory.itemPull.splice(this.clicked_item.num, 1)                    
                        this.clicked_item = undefined
                    }
                    else{
                        this.enchant_slot = this.clicked_item                  
                        this.inventory.itemPull.splice(this.clicked_item.num,1)
                        this.clicked_item = undefined
                    }                   
                }
                else{
                    if(this.enchant_slot){
                        this.inventory.itemPull.push(this.enchant_slot)
                        this.enchant_slot = undefined
                    }  
                }
                this.open(true)
            })

            enchant_shard.addEventListener('click', e=>{
                if(this.clicked_item && this.clicked_item instanceof Shard){
                    if(this.enchant_shard != undefined){
                        this.inventory.itemPull.push(this.enchant_shard)
                        this.enchant_shard = this.clicked_item    
                        this.inventory.itemPull.splice(this.clicked_item.num, 1)                    
                        this.clicked_item = undefined
                    }
                    else{
                        this.enchant_shard = this.clicked_item                  
                        this.inventory.itemPull.splice(this.clicked_item.num,1)
                        this.clicked_item = undefined
                    }
                }
                else{
                    if(this.enchant_shard){
                        this.inventory.itemPull.push(this.enchant_shard)
                        this.enchant_shard = undefined
                    } 
                }
                this.open(true)
            })

            enchant_slot_img.classList = 'inventoryImage'
            enchant_shard_img.classList = 'inventoryImage'

            enchant_slot_img.src = this.enchant_slot ? this.enchant_slot.image_path : 'item_image/empty_slot.png'
            enchant_shard_img.src = this.enchant_shard ? this.enchant_shard.image_path : 'item_image/empty_slot.png'

            enchant_slot.appendChild(enchant_slot_img)
            enchant_shard.appendChild(enchant_shard_img)



            let encant_button = document.createElement('div')
            encant_button.innerText = `enchant`

            encant_button.addEventListener('click', e=>{
                if(this.enchant_slot && this.enchant_shard){
                    this.enchant()
                }
            })

            enchant_container.appendChild(encant_button)
            enchant_container.appendChild(enchant_slot)
            enchant_container.appendChild(enchant_shard)

            /////
            let exit = document.createElement('div')
            exit.innerText = 'exit'
            exit.addEventListener('click', e=>{
                let to_delete = document.getElementById('craft_container')
                if(to_delete){
                    to_delete.parentNode.removeChild(to_delete)
                }
                ItemCreator_open = false
                this.world.game.game = 'world'
                Loger.clear()
            })
            container.appendChild(inv)
            container.appendChild(disenchant)
            container.appendChild(enchant_container)
            container.appendChild(exit)
            body.appendChild(container)
        }     
    }

    disenchant(){
        if(this.disenchant_slot instanceof Item){
            let list_of_types = [];
            for(let prop in this.disenchant_slot){
                if(prop == 'fire') list_of_types.push(prop)
                if(prop == 'cold') list_of_types.push(prop)
                if(prop == 'light') list_of_types.push(prop)
                if(prop == 'phys') list_of_types.push(prop)
            }
            this.inventory.itemPull.push(new Shard(list_of_types[Math.floor(Math.random() * list_of_types.length)]))
            console.log(this.inventory.itemPull)
            this.disenchant_slot = undefined
            this.open(true)
        }
        
    }

    showDiscription(item, e){
        let disc = document.createElement('div')
        disc.id = 'disc';
        disc.style.top = e.pageY + 'px';
        disc.style.left = e.pageX + 'px';
        disc.innerHTML = item.getTooltip()
        let parrent = document.getElementById('craft_container')
        parrent.appendChild(disc)
    }

    closeDiscription(){
        let elem = document.getElementById('disc')
        if(elem){
            elem.parentNode.removeChild(elem)
        }
    }

    enchant(){
        if(this.checkType()){
            if(this.checkCount()){
                this.enchant_shard.enchant(this.enchant_slot)
                Loger.addLog(`<p>enchant complete</p>`)
            this.inventory.itemPull.push(this.enchant_slot)
            this.enchant_slot = undefined
            this.enchant_shard = undefined
            }
            else{
                Loger.addLog(`<p>enchant failed</p>`)
                this.enchant_slot = undefined
                this.enchant_shard = undefined
            }
           
        }
        else{
            Loger.addLog(`<p>this item have similar property</p>`)
        }
        this.open(true)
    }

    checkType(){
        for(let prop in this.enchant_slot){
            if(this.enchant_shard.type === prop){
                return false
            }
        }
        return true
    }
    checkCount(){
        let list_of_prop = ['fire', 'cold', 'light', 'phys']
        let num = 0;
        for(let prop in this.enchant_slot){
            if(list_of_prop.includes(prop)){
                num += 15
            }
        }
        console.log(num)
        return Math.random() * 100 > num
    }
}