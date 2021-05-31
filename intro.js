export class Intro{

    constructor(player, world){
        this.world = world
        this.player = player

        this.page = 1
        this.points_count = 10
    }

    createAtrBlock(name){
    
        let cont = document.createElement('div')
        cont.classList = 'atr_cont'
        let text = document.createElement('p')
        text.innerText = `${name} : ${this.player[name]}`;
        let plus = document.createElement('p')
        let minus = document.createElement('p')
        minus.innerText = '-'
        plus.innerText = '+'                   
        plus.addEventListener('click', e=>{
            if(this.points_count != 0){
                this.player[name] ++
                this.points_count --
            }
            this.show(true)
        })
        minus.addEventListener('click', e=>{
            if(this.player[name] != 0){
                this.player[name] --
                this.points_count ++
            }
            this.show(true)
        })
        cont.appendChild(plus)
        cont.appendChild(text)
        cont.appendChild(minus)
        return cont;
    }

    show(redraw = false) {
        
        if(redraw || !ItemCreator_open){
            let to_del = document.getElementById('intro_container')
            if(to_del){
            to_del.parentNode.removeChild(to_del)
            }
            ItemCreator_open = true
            let body = document.getElementById('body')
            let intro_container = document.createElement('div')
            intro_container.id = 'intro_container'

            let next_b = document.createElement('div');
            let prev_b = document.createElement('div');
            let button_cont = document.createElement('div')
            button_cont.id = 'button_cont'


            next_b.addEventListener('click', e=>{
                this.page ++;
                this.show(true)
                if(this.page == 8){
                    this.world.game = 'world'
                    this.world.sound.play()
                    let to_del = document.getElementById('intro_container')
                    if(to_del){
                    to_del.parentNode.removeChild(to_del)
                    }
                }
            })
            prev_b.addEventListener('click', e=>{
                if(this.page != 1) {this.page --;} 
                this.show(true)
            })


            button_cont.appendChild(prev_b)
            button_cont.appendChild(next_b)

            let text_cont = document.createElement('div')

            let text = document.createElement('p')
            text_cont.appendChild(text)
            text_cont.id = 'text_cont'
            intro_container.appendChild(text_cont)
            intro_container.appendChild(button_cont)
            


            next_b.innerText = ">"
            prev_b.innerText = "<"

            body.appendChild(intro_container)
            switch(this.page){
                case 1:
                    text.innerText = "Hey traveler, welcome you , in this simple game. These notes can help you find out some game aspects."
                break;
                case 2:
                    text.innerText = "In a part of the world, you can navigate using the WASD button, in the battle, you must use a mouse click instead."
                break;
                case 3:
                    text.innerText = "In a part of the world, 'I' button opening the inventory, 'T' button opening the skill tree, 'C' button opening the craft table."
                break;
                case 4:
                    text.innerText = "Next, you must spend a certain amount of points on attributes. Strength, impact on melle damage and how much you can carry. Stamina affects the health point and the chance to drop a bad affliction."
                break;
                case 5:
                    text.innerText = "Intellect, impact on spell damage and mana points. Willpower affects the health and mana regeneration and the chance to drop a bad affliction."
                break;
                case 6:
                    text.innerText = "Agility, increase crit chance and crit multiplier. Speed increase evade chance."
                break;
                case 7:
                    let stats_cont = document.createElement('div');
                    stats_cont.id = 'stats_cont'
                    let points_count_cont = document.createElement('p')
                    points_count_cont.innerText = `${this.points_count}`

                    stats_cont.appendChild(this.createAtrBlock('strength'))
                    stats_cont.appendChild(this.createAtrBlock('stamina'))
                    stats_cont.appendChild(this.createAtrBlock('intellect'))
                    stats_cont.appendChild(this.createAtrBlock('willpower'))
                    stats_cont.appendChild(this.createAtrBlock('agility'))
                    stats_cont.appendChild(this.createAtrBlock('speed'))
                    text_cont.appendChild(points_count_cont)
                    text_cont.appendChild(stats_cont);
                break;
            }
            
        }
       
    } 

}