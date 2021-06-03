import { ItemCreator } from "./scripts/items/item_creator.js";
import { Loger } from './loger.js';
import { HTMLRender} from "./HTMLRender.js";

export class Inventory{

    static clicked_item = undefined;

    static itemPull = [
        ItemCreator.createRandomItem(),
        ItemCreator.createRandomItem(),
        ItemCreator.createRandomItem()
    ]

    static inventory_is_open = false

    static equip = {
        'head' : undefined,
        'left_hand' : undefined,
        'chest' : undefined,
        'right_hand' : undefined,
        'boots' : undefined,
        'ring1 ' : undefined,
        'ring2' : undefined
    }

    getItem(item){
        if(Inventory.itemPull.length < 30){
            Inventory.itemPull.push(item)
        }
        else{
            console.log('owroqwwrqwrq')
            Loger.addLog(`<p>you are overwhelmed</p>`)
        }
    }

    static openInventory(player){
        if(!Inventory.inventory_is_open){
            Inventory.inventory_is_open = true;
            HTMLRender.drawInventory(player);
        }
    }
}