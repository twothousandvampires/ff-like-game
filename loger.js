import {Player} from './player.js'
import {Enemy} from './scripts/enemy/enemy.js'

export class Loger{

    static log = document.getElementById('log')

    static addLog(value){
        Loger.log.innerHTML = this.log.innerHTML + value
        Loger.log.scrollTop = 10000
    }

    static damageInfo(damage, target){
        let body = document.getElementById('body')
        let ticks = 10;
        let x =  target.battlePos.x * 100 + 25
        let y = target.battlePos.y * 100  
        let window = document.createElement('div');
        window.innerHTML = `<p class = '${target instanceof Player ? 'bluetext' : 'redtext'}'>${damage}</p>`
        window.style.position = 'absolute';
        window.style.top = y + 'px';
        window.style.left = x +'px';
        body.appendChild(window)
        let up = setInterval(()=>{         
            y -= 5;
            window.style.top = y + 'px';
            ticks -= 1;
            if(ticks === 0){
              
                window.parentNode.removeChild(window)
                clearInterval(up)
            }
        },100)
    }
    static clear(){
        Loger.log.innerHTML = ''
    }
}
