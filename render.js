import {ImageData} from "./image_data.js";

export class Render{

	static ImageData = new ImageData()

	static canvas = document.getElementById('can')

	static ctx = Render.canvas.getContext('2d')

	static drawWorld(cords, plan){
		Render.ctx.clearRect(0,0,800,800)
		for(let i = cords.yStart, o = 0; i < cords.yEnd; i++, o ++){
			for(let j = cords.xStart, l = 0; j < cords.xEnd; j++, l ++){
				let img
				switch(plan[i][j].type){
					case 0:
						img = this.ImageData.getForestImage(plan[i][j].f_type)
						break;
					case 1:
						img = this.ImageData.getWaterImage()
						break;
					case 2:
						img = this.ImageData.getFieldImage()
						break;
				}
				Render.ctx.drawImage(img,0,0,100,100,l * 100, o *100, 100, 100)
			}
		}
	}
	// environment
	static drawDangeon(cord, plan){
		for(let i = cord.yStart, o = 0; i < cord.yEnd; i++, o ++){
			for(let j = cord.xStart, l = 0; j < cord.xEnd; j++, l ++){
				Render.ctx.drawImage(plan[i][j].image,0,0,100,100,l * 100, o *100, 100, 100)
			}
		}
	}

	static drawPlayer(player , plan, dangeon){
		let x = 300;
		let y = 300;
		if(player.pos.x  <= 2){
			x = player.pos.x * 100
		}
		if(!dangeon){
			if(player.pos.x >= plan[0].length - 3){
				x = 600 - (((plan[0].length - 1 ) - player.pos.x) * 100)
			}
		}
		else{
			if(player.pos.x >= dangeon.plan[0].length - 3){
				x = 600 - (((dangeon.plan[0].length - 1) - player.pos.x) * 100)
			}
		}

		if(player.pos.y  <= 2){
			y = player.pos.y  * 100
		}
		if(!dangeon){
			if(player.pos.y >= plan.length -3 ){
				y = 600 - (((plan.length - 1) - player.pos.y ) * 100)
			}
		}
		else{
			if(player.pos.y >= dangeon.plan.length -3 ){
				y = 600 - (((dangeon.plan.length - 1) - player.pos.y ) * 100)
			}
		}
		this.ctx.drawImage(player.image,0,0,75,100,x,y,100,100);
	}

	static drawEnemy(enemy, cord , dangeon){
		let array_to_draw = dangeon ? dangeon.enemy : enemy
		for(let i = cord.yStart, o = 0; i < cord.yEnd; i++, o ++){
			for(let j = cord.xStart, l = 0; j < cord.xEnd; j++, l ++) {
				array_to_draw.forEach(elem => {
					if (elem.pos.x == j && elem.pos.y == i) {
						Render.ctx.drawImage(elem.image, 0, 0, 100, 100, l * 100, o * 100, 100, 100)
					}
				})
			}
		}
	}

	static drawTowns(cord , towns){
		for(let i = cord.yStart, o = 0; i < cord.yEnd; i++, o ++){
			for(let j = cord.xStart, l = 0; j < cord.xEnd; j++, l ++){
				towns.forEach(elem =>{
					if(elem.x == j && elem.y == i){
						this.ctx.drawImage(elem.image,0,0,400,400,l *100, o *100, 100,100)
					}
				})
			}
		}
	}

	static drawDangeonsOnMap(cord, arr){

	}

	static drawBattleField(plan, enemy, player){
		Render.ctx.clearRect(0,0,800,800);
		plan.forEach( elemRow => {
			elemRow.forEach( elem => {
				Render.ctx.drawImage(elem.image,0,0,100,100,elem.x *100,elem.y*100,100,100)
			})
		})

		Render.ctx.drawImage(player.image,0,0,100,100,player.battlePos.x *100,player.battlePos.y*100,100,100)

		for(let i = 0; i < enemy.enemy.length;i++){
			let item = enemy.enemy[i]
			Render.ctx.drawImage(item.image,0,0,100,100,item.battlePos.x * 100, item.battlePos.y*100,100,100)
		}
	}
}