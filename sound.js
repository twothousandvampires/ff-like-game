export class SoundController{
    constructor(world){
        this.vol = 0;
        this.world = world
        this.body = document.getElementById('body')
        this.audio = document.createElement('audio')
             
    }

    play(){
       setTimeout(()=>{          
            this.audio.volume = this.vol
            let volume = setInterval(() => {
                this.vol += 0.05;
                this.audio.volume = this.vol
                if(this.vol == 1){
                    clearInterval(volume)
                }  
            }, 400);
            switch(this.world.game){
                case 'world':
                    this.audio.src = 'music/OLD SORCERY-Of Dragon39s Blood.mp3' 
                    this.audio.play()
                    break;
            }
    },4000)
    }
}