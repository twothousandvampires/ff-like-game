export class Functions{

	static getRandomInt(max, min){
		if(min && max){
			return Math.floor(Math.random() * (max-min) + min);
		}
		else if(max){
			if(max < 1){
				return Math.random() * max
			}
			else {
				return Math.floor(Math.random() * max)
			}

		}
		else {
			return Math.random()
		}
	}

	static calcDamage(damage, res){
		let result = 0;
		if(res < 0){
			result = Math.ceil(damage  * (1 * Math.abs(res/100)))
		}
		else{
			result = Math.ceil(damage - damage * (res/100))
		}
		return result
	}

	static createElem(type, id, classList){
		let elem = document.createElement(type);
		if(id){
			elem.id = id;
		}
		if(classList){
			elem.classList = classList
		}
		return elem;
	}

	static appendElem(...args){
		let elem = args[0]
		for(let i = 1; i < args.length; i++){
			elem.appendChild(args[i])
		}
	}
}