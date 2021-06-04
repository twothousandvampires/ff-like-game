import {Player} from './player.js'
import {Enemy} from './scripts/enemy/enemy.js'

export class Loger{

    static log = document.getElementById('log')

    static addLog(value){
        Loger.log.innerHTML = this.log.innerHTML + value
        Loger.log.scrollTop = 10000
    }

    static damageInfo(damage, target){
        let x_offset = document.getElementById('can').offsetLeft
        let y_offset = document.getElementById('can').offsetTop
        let body = document.getElementById('body')
        let ticks = 40;
        let x =  target.battlePos.x * 100 + 25 + x_offset
        let y = target.battlePos.y * 100  + y_offset
        let window = document.createElement('div');
        window.id = 'damage_text_up'
        window.innerHTML = `<p class = '${target instanceof Player ? 'bluetext' : 'goldtext'}'>${damage}</p>`
        window.style.position = 'absolute';
        window.style.top = y + 'px';
        window.style.left = x +'px';
        body.appendChild(window)
        let up = setInterval(()=>{         
            y -= 2;
            window.style.top = y + 'px';
            ticks -= 1;
            if(ticks === 0){
              
                window.parentNode.removeChild(window)
                clearInterval(up)
            }
        },20)
    }
    static clear(){
        Loger.log.innerHTML = ''
    }
}
