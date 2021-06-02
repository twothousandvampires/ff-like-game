import {Fireball} from "./skills/fireball.js";
import {Icenova} from "./skills/icenova.js";
import {HTMLRender} from "./HTMLRender.js";
import {ElementalMastery} from "./skills/elemental_mastery.js";

export class SkillTree{

    static trees = [
        [
            new Fireball(),
            new Icenova(),
            new ElementalMastery()
        ],
        [
            new Fireball(),
        ]

    ]

    static getBGimage(page){
        switch (page){
            case 0:
                return 'backgrounds/elemental_page.png'
                break
        }
    }

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