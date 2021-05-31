import { ItemCreator} from "./scripts/items/item_creator.js"
import { Loger } from "./loger.js";

function createElem(type, id, classList){
    let elem = document.createElement(type);
    if(id){
        elem.id = id;
    }  
    if(classList){
        elem.classList = classList
    } 
    return elem;
}

function appendElem(...args){
    let elem = args[0]
    for(let i = 1; i < args.length; i++){
        elem.appendChild(args[i])
    }
}

export class Town{
    
    constructor(world, x, y){
        this.name = 'Daru-un'
        this.shop_range = []
        this.clickedItem = undefined;
        this.clicked_inv_item = undefined;
        this.place = 'main'
        this.enter = false
        this.world = world

        this.player = world.player

        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = 'world_image/pixel_town.png'
        this.town_image = 'town_image/' + Math.floor(Math.random() * (4 -  1) +1) + '.png'      
        this.fillShop();
        this.fill(this.world)
    }

    enterToTown(inv , reenter = false){
        if(!this.enter){
            Loger.addLog(`<p>you enter to ${this.name}</p>`)
        }  
        if(!this.enter || reenter){  
            this.inventory = inv 
            this.enter = true;
            this.draw();
        }
    }



    draw(){        
        this.drawTown()
    }

    drawTownMenu(){

        let menu = createElem('div', 'town_menu');

        let to_shop = createElem('div', 'town_shop_menu', 'town_button');
        to_shop.style.cursor = 'pointer'
        to_shop.innerHTML = '<p>Shop</p>';
        to_shop.addEventListener('click', e =>{
            this.place = 'shop'
            this.draw(true)
        })

        let to_shrine = createElem('div', 'town_shrine_menu', 'town_button')
        to_shrine.style.cursor = 'pointer'
        to_shrine.innerHTML = '<p>Shrine</p>';
        to_shrine.addEventListener('click', e =>{
            this.place = 'shrine'
            this.draw(true)
        })

        let to_tawern = createElem('div', 'town_shrine_menu', 'town_button')
        to_tawern.style.cursor = 'pointer'
        to_tawern.innerHTML = '<p>Tawern</p>';
        to_tawern.addEventListener('click', e =>{
            this.place = 'tawern'
            this.draw(true)
        })

        let exit = createElem('div', 'town_exit_menu', 'town_button')
        exit.style.cursor = 'pointer'
        exit.innerHTML = '<p>Exit</p>';
        exit.addEventListener('click', e =>{
            let toDelete = document.getElementById('town_container');
            if(toDelete){
            toDelete.parentNode.removeChild(toDelete)
            }
            Loger.clear()
            this.place = 'main'
            this.enter = false
            this.player.pos.y += 1
            this.world.game.game = 'world'
            console.log(this.player.quest)
        })

        appendElem(menu ,to_shop, to_shrine, to_tawern, exit)
        return menu;
    }

    drawTown(){
        let toDelete = document.getElementById('town_container');
        if(toDelete){
            toDelete.parentNode.removeChild(toDelete)
        }
        switch(this.place){
            case 'main':
                this.drawMain();
                break;
            case 'shop':
                this.drawShop();
                break;
            case 'shrine':
                this.drawShrine();
                break;
            case 'tawern':
                this.drawTawern();
                break;
        }
    }

    drawMain(){  
        let town_container = createElem('div', 'town_container')
        town_container.style.backgroundImage = `url(${this.town_image})`
        let menu = this.drawTownMenu();
        let body = document.getElementById('body')
        town_container.appendChild(menu)
        body.appendChild(town_container)
    }

    drawTawern(inTawern){

        let toDelete = document.getElementById('town_container');
        if(toDelete){
            toDelete.parentNode.removeChild(toDelete)
        }
        let body = document.getElementById('body')
        let town_container = createElem('div', 'town_container')
        town_container.style.backgroundImage = `url(${this.town_image})`
        let menu = this.drawTownMenu();

        let tawern_menu = createElem('div', 'tawern_menu')

        let q = document.createElement('p')
        q.innerText = 'quests'
        q.addEventListener('click', e=>{
            this.drawTawern('quest')
        })
        let g = document.createElement('p')
        g.innerText = 'game'
        appendElem(tawern_menu, q, g)
        town_container.appendChild(menu)
        town_container.appendChild(tawern_menu)
        switch(inTawern){
            case 'quest':
                let quest_container = createElem('div')  
                for(let i = 0; i < this.quest.length; i++){
                    let item = createElem('div', 'quest')

                    item.innerHTML += `<p>${this.quest[i].name}</p>`
                    item.innerHTML += `<p>${this.quest[i].discription}</p>`
                    let take = createElem('p')
                    take.classList = 'take_quest'
                    if(this.player.quest.includes(this.quest[i])){
                        take.innerText = `complete`
                        take.addEventListener('click', e => {                    
                            if(this.quest[i].complete()){
                                this.quest = this.quest.filter( elem => {
                                    this.quest[i].reward(this.player)
                                    return elem != this.quest[i]
                                })
                            }
                            else{
                                console.log('n')
                            } 
                            this.drawTawern('quest')                    
                        })
                    }
                    else{
                        take.innerText = `take`
                        take.addEventListener('click', e => {                    
                            this.player.quest.push(this.quest[i])
                            this.drawTawern('quest')                   
                        })
                    }
                    item.appendChild(take)
                    quest_container.appendChild(item)
                }

                town_container.appendChild(quest_container)
            break;
            default:

            break;
        }
        
        
      
        body.appendChild(town_container)    
        
    }

    drawShop(){
        let body = document.getElementById('body')

        let town_container = createElem('div', 'town_container')
        town_container.style.backgroundImage = `url(${this.town_image})`

        let menu = this.drawTownMenu();

        let shop_and_inv = createElem('div', 'shop_and_inv')
        let shop = createElem('div', 'town_shop')
        shop.addEventListener('click', e=>{
            if(this.clicked_inv_item){
                Loger.addLog(`<p>you sold ${this.clicked_inv_item.name} for ${this.clicked_inv_item.sell}</p>`)
                this.player.gold += this.clicked_inv_item.sell
                this.inventory.itemPull.splice(this.clicked_inv_item.num, 1)
                this.clicked_inv_item = undefined;
                this.unclick()
                this.drawTown()
                console.log(this.player.gold)

            }
            this.unclick()
            this.drawTown()
        })
        shop.innerHTML = '<p>Shop<p>'
        for(let i = 0; i < this.shop_range.length;i++){
            let cell = createElem('div')

            let image = createElem('img', false , 'inventoryImage')
            if(this.shop_range[i].clicked){
                image.className = 'inventoryImage green_border';
            }

            image.addEventListener('mouseenter' , e=>{
                this.showDiscription(this.shop_range[i], e)
            })

            image.addEventListener('mouseleave' , e=>{
                this.closeDiscription()
            })
            image.src = this.shop_range[i].image_path
            this.shop_range[i].num = i
            cell.addEventListener('click', e=>{
                e.stopPropagation()
                this.unclick()
                this.shop_range[i].clicked = true
                this.clickedItem = this.shop_range[i]
                console.log(this.clickedItem)
                this.drawTown()
            })

            cell.appendChild(image)
            shop.appendChild(cell)
        }

        let inventory = createElem('div', 'town_inventory')
        inventory.innerHTML = '<p>Inventory<p>'
        inventory.addEventListener('click', e => {
            console.log(this.player)
            if(this.clickedItem){
                if(this.clickedItem.buy <= this.player.gold){
                    Loger.addLog(`<p>you bought ${this.clickedItem.name} for ${this.clickedItem.buy}</p>`)
                    this.player.gold -= this.clickedItem.buy;
                    this.inventory.itemPull.push(this.clickedItem);
                    this.shop_range.splice(this.clickedItem.num, 1);
                    this.unclick()
                    this.drawTown()
                }
                else{
                    Loger.addLog(`<p>not enough gold</p>`)
                }
            }
        })
        for(let i = 0; i < this.inventory.itemPull.length;i++){
            let cell = createElem('div')
            this.inventory.itemPull[i].num = i
            let image = createElem('img', false, 'inventoryImage')
            if(this.inventory.itemPull[i].clicked){
                image.className = 'inventoryImage green_border';
            }
            image.addEventListener('mouseenter' , e=>{
                this.showDiscription(this.inventory.itemPull[i], e)
            })

            image.addEventListener('mouseleave' , e=>{
                this.closeDiscription()
            })
            image.src = this.inventory.itemPull[i].image_path
            cell.addEventListener('click', e =>{
                this.unclick()
                this.inventory.itemPull[i].clicked = true
                this.clicked_inv_item = this.inventory.itemPull[i]
                this.drawTown()
            })
            cell.appendChild(image)
            inventory.appendChild(cell)
        }

        appendElem(shop_and_inv, shop, inventory)
        appendElem(town_container, menu, shop_and_inv)
        body.appendChild(town_container)
    }

    drawShrine(){
        let body = document.getElementById('body')

        let town_container = createElem('div', 'town_container')

        let menu = this.drawTownMenu();

    }



    fillShop(){
        console.log(ItemCreator)
        let count = Math.floor(Math.random() * (10 - 1) + 1);

        for(let i = 0; i < count; i++){
            this.shop_range.push(ItemCreator.createRandomItem())
        }

    }

    unclick(){
        this.clickedItem = undefined;
        this.clicked_inv_item = undefined;
        this.inventory.itemPull = this.inventory.itemPull.map((elem) => {
            elem.clicked = false
            return elem
        })
        
        this.shop_range = this.shop_range.map((elem) => {
            elem.clicked = false
            return elem
        })
    }

    fill(world){
        switch(this.name){
            case `Daru-un`:
                this.quest = []
                this.quest.push({                    
                    'name' : 'kill the wolfs',
                    'discription' : 'wolves in the northwest are terrorizing our sawmill, please kill them',
                    'complete' : function(){
                        for(let i = 0; i < world.enemy.length; i ++){
                            if(world.enemy[i].quest === this.name){
                                return false
                            }
                        }
                        return true
                    },
                    'reward' : function(player){
                        player.addExp(2000)
                    }                
                })
                break;
        }
    }

    showDiscription(item, e){
        let disc = document.createElement('div')
        disc.id = 'disc';
        disc.style.top = e.pageY + 'px';
        disc.style.left = e.pageX + 'px';
        disc.innerHTML = item.getTooltip(true)
        let parrent = document.getElementById('town_container')
        parrent.appendChild(disc)
    }

    closeDiscription(){
        let elem = document.getElementById('disc')
        if(elem){
            elem.parentNode.removeChild(elem)
        }
    }
}