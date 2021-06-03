import {World} from './world.js'
import {Loger} from './loger.js'
import { Battleground } from './battleground.js'
import { SoundController } from './sound.js'
import {ItemCreator} from "./scripts/items/item_creator.js"
import { Inventory } from './inventory.js'
import { Craft } from './craft.js'
import { Intro } from './intro.js'
import {SkillTree} from "./skilltree.js"
import {Functions} from "./functions.js";



export class Game{

        static town = undefined
        static game = 'world'
        static world = new World(100,100)
        static sound = new SoundController()
        static intro = new Intro(Game.world.player)


    static gameLoop(){

        setInterval(()=>{
            switch(Game.game){
                case 'intro':
                    Game.world.drawWorld()
                    Game.intro.show()
                    break;
                case 'world':
                    let e = Game.world.collisionWithEnemy()
                    let t = Game.world.collisionWithTown()

                    if(e){
                        Game.game = 'battle';
                        Battleground.newBattle(e, Game.world.player)
                        break;
                    }                  
                    if(t){
                        Game.game = 'town';
                        Game.town = t;
                        break;
                    }
                    Game.world.drawLoop()
                    break;

                case 'battle':
                    Battleground.battleLoop()
                    break;
                case 'inventory':
                    Inventory.openInventory(this.world.player);
                    break;
                case 'town':
                    Game.town.enterToTown(this.inventory, false)
                    break;
                case 'skill_tree':
                    SkillTree.openTree(this.world.player)
                    break;
                case 'craft':
                    Game.craft.open()
                    break;
            }
        },1000/60)    
    }
}




Game.gameLoop()

