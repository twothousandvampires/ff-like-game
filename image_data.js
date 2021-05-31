export class ImageData{
	
	constructor() {
		this.forest_img0 = new Image()
		this.forest_img0.src	= 'world_image/forest0.png'

		this.forest_img1 = new Image()
		this.forest_img1.src = 'world_image/forest1.png'

		this.forest_img2 = new Image();
		this.forest_img2.src = 'world_image/forest2.png'

		this.forest_img3 = new Image()
		this.forest_img3.src = 'world_image/forest3.png'

		this.forest_img4 = new Image()
		this.forest_img4.src = 'world_image/forest4.png'

		this.water_img = new Image();
		this.water_img.src = 'world_image/water.png';

		this.field_img = new Image();
		this.field_img.src = 'battle_image/grass.png';

		this.black = new Image();
		this.black.src = 'world_image/black.png';

		this.forest_array = [
			this.forest_img0,
			this.forest_img1,
			this.forest_img2,
			this.forest_img3,
			this.forest_img4
		]
	}

	getForestImage(type){
		return this.forest_array[type]
	}

	getWaterImage(){
		return this.water_img
	}

	getFieldImage(){
		return this.field_img
	}
}