import {Fireball} from "./skills/fireball.js";
import {Icenova} from "./skills/icenova.js";
import {HTMLRender} from "./HTMLRender.js";

export class SkillTree{

    static trees = [
        [
            new Fireball(),
            new Icenova()
        ],
        [
            new Fireball(),
        ]

    ]

    static page = 0

    static pages = [
        'elemental',
        'popa'
    ]

    static openTree(player){
        if(!SkillTree.is_open){
            SkillTree.is_open = true;
            HTMLRender.drawSkillTree(player);
        }
    }
}