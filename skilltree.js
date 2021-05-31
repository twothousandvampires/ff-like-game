import {Fireball} from "./skills/fireball.js";
import {Icenova} from "./skills/icenova.js";

export class Skilltree{


    constructor(){
        this.elemental = [
            new Fireball(),
            new Icenova(),
        ]
    }

    open(){

    }

}