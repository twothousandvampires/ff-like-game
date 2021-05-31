import {Inventory} from "./inventory.js";
import {Game} from "./main.js";

export class HTMLRender{

	static drawInventory(player){

		let toDelete = document.getElementById('inventory_container');
		if(toDelete){
			toDelete.parentNode.removeChild(toDelete);
		}

		// take the body
		let body = document.getElementById('body');

		// create main container
		let container = document.createElement('div');

		container.addEventListener('mousedown' ,e =>{
			if(e.which === 2){
				HTMLRender.unclick();
				HTMLRender.drawInventory(player)
			}
		})

		container.id = 'inventory_container'

		// create equip table
		// pull
		let pull = document.createElement('div');

		pull.id = 'pull'
		console.log(Inventory.itemPull)
		for(let i = 0; i < Inventory.itemPull.length; i++){
			let discTimer;
			let cell = document.createElement('div');
			cell.id = 'cell'
			let image = document.createElement('img');
			image.className = 'inventoryImage';
			if(Inventory.itemPull[i].clicked){
				image.className = 'inventoryImage green_border'
			}
			image.src = Inventory.itemPull[i].image_path;

			cell.addEventListener('click', e =>{
					HTMLRender.unclick()
					Inventory.itemPull[i].clicked = true;
					Inventory.clicked_item = Inventory.itemPull[i]
					Inventory.clicked_item.num = i
					console.log(Inventory.clicked_item)
					HTMLRender.drawInventory(player)
			})

			cell.addEventListener('mouseover', e =>{
				discTimer = setTimeout(()=>{
						HTMLRender.showDiscription(Inventory.itemPull[i], e)
					},1000)
				})
				cell.addEventListener('mouseleave', e =>{
					clearTimeout(discTimer)
					HTMLRender.closeDiscription();
				})


				cell.appendChild(image);
				pull.appendChild(cell)
			}

			// exit button

			let exit = document.createElement('div');
			exit.innerText = 'Выход'
			exit.addEventListener('click', e =>{
				Inventory.inventory_is_open = false
				let toDelete = document.getElementById('inventory_container');
				if(toDelete){
					toDelete.parentNode.removeChild(toDelete);
				}
				Game.game = 'world'
			})


			// show player stats

			let stats = document.createElement('div')
			stats.id = 'stats'
			let hp = document.createElement('p')

			hp.innerText = 'hp ' + player.current_hp + "/" + player.max_hp

			let damage = document.createElement('p')
			let colddamage = document.createElement('p')
			let firedamage = document.createElement('p')
			let lightningdamage = document.createElement('p')
			let light_res = document.createElement('p')
			let cold_res = document.createElement('p')
			let fire_res = document.createElement('p')
			let armour = document.createElement('p')
			let mana = document.createElement('p')
			let exp = document.createElement('p')
			let block_evade = document.createElement('p')
			let crit = document.createElement('p')

			damage.innerText = 'damage -' + player.min_damage + " - " + player.max_damage
			colddamage.innerText = 'cold damage : ' + player.min_cold_damage + ' - ' + player.max_cold_damage
			firedamage.innerText = 'fire damage : ' + player.min_fire_damage + ' - ' + player.max_fire_damage
			lightningdamage.innerText = 'lightning damage : ' + player.min_light_damage + ' - ' + player.max_light_damage
			light_res.innerText = 'lightning res : ' + player.light_res
			cold_res.innerText = 'cold res : ' + player.cold_res
			fire_res.innerText = 'fire res : ' + player.fire_res
			armour.innerText = 'armour : ' + player.armour
			mana.innerText = 'mp : ' + player.current_mana + "/" + player.max_mana
			exp.innerText = 'exp : ' + player.exp + " / " + player.exp_for_level
			block_evade.innerText = `block : ${player.block} / evade : ${player.evade}`
			crit.innerText = `crit chance : ${player.critical_chance} / crit multi : ${player.crirical_multi * 100}`

			let stats_and_equip = document.createElement('div');

			stats_and_equip.id = 'stats_and_equip'

			stats_and_equip.appendChild(HTMLRender.createEquip(player))
			stats_and_equip.appendChild(stats)

			stats.appendChild(hp)
			stats.appendChild(mana)
			stats.appendChild(damage)
			stats.appendChild(colddamage)
			stats.appendChild(firedamage)
			stats.appendChild(lightningdamage)
			stats.appendChild(light_res)
			stats.appendChild(cold_res)
			stats.appendChild(fire_res)
			stats.appendChild(armour)
			stats.appendChild(exp)
			stats.appendChild(block_evade)
			stats.appendChild(crit)

			let trash = document.createElement('div')
			trash.id = 'trash'
			let trash_image = document.createElement('img')
			trash_image.src = 'item_image/trash.png'
			trash_image.className = 'inventoryImage';
			trash.appendChild(trash_image)
			trash.addEventListener('click', e=>{
				if(Inventory.clicked_item){
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			})
			//////////
			let trash_and_exit = document.createElement('div')
			trash_and_exit.id = 'trash_and_exit'
			trash_and_exit.appendChild(trash)
			trash_and_exit.appendChild(exit)

			// append slots
			container.appendChild(trash_and_exit)
			container.appendChild(pull)
			container.appendChild(stats_and_equip)

			body.appendChild(container)




	}
	static unclick(){
		Inventory.clicked_item = undefined;
		Inventory.itemPull = Inventory.itemPull.map((elem) => {
			elem.clicked = false
			return elem
		})
	}
	static createEquip(player){

		let equip = document.createElement('div');
		equip.id = 'equip';

		// create head slot


		let p = document.createElement('div');
		p.id = 'player';
		let p_image = document.createElement('img')
		p_image.src = 'item_image/head.png'
		p.appendChild(p_image)

		p.addEventListener('click' , e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.type === 'used'){
				Inventory.clicked_item.use(player)
				Inventory.itemPull.splice(Inventory.clicked_item.num,1);
				Inventory.clicked_item = null;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
			else{
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})

		let head = document.createElement('div');
		let head_image = document.createElement('img');
		head_image.src = Inventory.equip.head ? Inventory.equip.head.image_path : 'item_image/empty_slot.png'
		head_image.className = 'inventoryImage';

		head.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'head'){
				if(Inventory.equip.head === undefined){
					Inventory.clicked_item.equip(player)

					InventoryInventory.equip.head = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.equip.head.equip(player)
					Inventory.clicked_item.unequip(player)
					let temp = Inventory.equip.head;
					Inventory.equip.head = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.head){
				Inventory.equip.head.unequip(player)
				Inventory.itemPull.push(Inventory.equip.head);
				Inventory.equip.head = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})
		head.id = 'head';
		head.innerText = Inventory.equip.head ? Inventory.equip.head.name : 'head'
		head.appendChild(head_image)

		// create left hand slot

		let left = document.createElement('div');
		let left_image = document.createElement('img');
		left.id = 'left'
		left_image.src = Inventory.equip.left_hand ? Inventory.equip.left_hand.image_path : 'item_image/empty_slot.png'
		left_image.className = 'inventoryImage';

		left.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'left_hand'){
				if(Inventory.equip.left_hand === undefined){
					Inventory.clicked_item.equip(player)
					Inventory.equip.left_hand = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					console.log("!")
					Inventory.equip.left_hand.unequip(player)
					Inventory.clicked_item.equip(player)

					let temp = Inventory.equip.left_hand;
					Inventory.equip.left_hand = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.left_hand){
				Inventory.equip.left_hand.unequip(player)
				Inventory.itemPull.push(Inventory.equip.left_hand);
				Inventory.equip.left_hand = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})
		left.innerText = Inventory.equip.left_hand ? Inventory.equip.left_hand.name : 'left hand'
		left.appendChild(left_image)


		// create right hand slot

		let right = document.createElement('div');
		let right_image = document.createElement('img');

		right_image.src = Inventory.equip.right_hand ? Inventory.equip.right_hand.image_path : 'item_image/empty_slot.png'
		right_image.className = 'inventoryImage';

		right.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'right_hand'){
				if(Inventory.equip.right_hand === undefined){
					Inventory.clicked_item.equip(player)
					Inventory.equip.right_hand = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = undefined;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.clicked_item.equip(player)
					Inventory.equip.right_hand.unequip(player)
					let temp = Inventory.equip.right_hand;
					Inventory.equip.right_hand = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = undefined;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.right_hand){
				Inventory.equip.right_hand.unequip(player)
				Inventory.itemPull.push(Inventory.equip.right_hand);
				Inventory.equip.right_hand = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})
		right.id = 'right';
		right.innerText = Inventory.equip.right_hand ? Inventory.equip.right_hand.name : 'right hand'
		right.appendChild(right_image)

		// create chest hand slot

		let chest = document.createElement('div');
		let chest_image = document.createElement('img');
		chest.id = 'chest'
		chest_image.src = Inventory.equip.chest_hand ? Inventory.equip.chest.image_path : 'item_image/empty_slot.png'
		chest_image.className = 'inventoryImage';

		chest.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'chest'){
				if(Inventory.equip.chest === undefined){
					Inventory.clicked_item.equip(player)

					Inventory.equip.chest = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.clicked_item.equip(player)
					Inventory.clicked_item.unequip(player)
					let temp = Inventory.equip.chest;
					Inventory.equip.chest = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.chest){
				Inventory.equip.chest.unequip(player)
				Inventory.itemPull.push(Inventory.equip.chest);
				Inventory.equip.chest = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})

		chest.innerText = Inventory.equip.chest ? Inventory.equip.chest.name : 'chest'
		chest.appendChild(chest_image)

		// create boots hand slot

		let boots = document.createElement('div');
		let boots_image = document.createElement('img');
		boots.id = 'boots'
		boots_image.src = Inventory.equip.boots ? Inventory.equip.boots.image_path : 'item_image/empty_slot.png'
		boots_image.className = 'inventoryImage';

		chest.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'boots'){
				if(Inventory.equip.chest === undefined){
					Inventory.clicked_item.equip(player)

					Inventory.equip.boots = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.clicked_item.equip(player)
					Inventory.clicked_item.unequip(player)
					let temp = Inventory.equip.boots;
					Inventory.equip.boots = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.boots){
				Inventory.equip.boots.unequip(player)
				Inventory.itemPull.push(Inventory.equip.boots);
				Inventory.equip.boots = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})
		boots.innerText = Inventory.equip.boots ? Inventory.equip.boots.name : 'boots'
		boots.appendChild(boots_image)


		// ring1

		let ring1 = document.createElement('div');
		let ring1_image = document.createElement('img');
		ring1.id = 'ring1'
		ring1_image.src = Inventory.equip.ring1 ? Inventory.equip.ring1.image_path : 'item_image/empty_slot.png'
		ring1_image.className = 'inventoryImage';

		ring1.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'ring'){
				if(Inventory.equip.ring1 === undefined){
					Inventory.clicked_item.equip(player)

					Inventory.equip.ring1 = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.clicked_item.equip(player)
					Inventory.clicked_item.unequip(player)
					let temp = Inventory.equip.ring1;
					Inventory.equip.ring1 = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.ring1){
				Inventory.equip.ring1.unequip(player)
				Inventory.itemPull.push(Inventory.equip.ring1);
				Inventory.equip.ring1 = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})

		ring1.innerText = Inventory.equip.ring1 ? Inventory.equip.ring1.name : 'ring'
		ring1.appendChild(ring1_image)

		// ring2

		let ring2 = document.createElement('div');
		let ring2_image = document.createElement('img');
		ring2.id = 'ring2'
		ring2_image.src = Inventory.equip.ring2 ? Inventory.equip.ring2.image_path : 'item_image/empty_slot.png'
		ring2_image.className = 'inventoryImage';

		ring2.addEventListener('click', e =>{
			if(Inventory.clicked_item && Inventory.clicked_item.slot === 'ring'){
				if(Inventory.equip.ring2 === undefined){
					Inventory.clicked_item.equip(player)

					Inventory.equip.ring2 = Inventory.clicked_item;
					Inventory.itemPull.splice(Inventory.clicked_item.num,1);
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
				else{
					Inventory.clicked_item.equip(player)
					Inventory.clicked_item.unequip(player)
					let temp = Inventory.equip.ring2;
					Inventory.equip.ring2 = Inventory.clicked_item;
					Inventory.itemPull[Inventory.clicked_item.num] = temp;
					Inventory.clicked_item = null;
					HTMLRender.unclick()
					HTMLRender.drawInventory(player)
				}
			}
			else if(!Inventory.clicked_item && Inventory.equip.ring2){
				Inventory.equip.ring2.unequip(player)
				Inventory.itemPull.push(Inventory.equip.ring2);
				Inventory.equip.ring2 = undefined;
				HTMLRender.unclick()
				HTMLRender.drawInventory(player)
			}
		})

		ring2.innerText = Inventory.equip.ring2 ? Inventory.equip.ring2.name : 'ring'
		ring2.appendChild(ring2_image)

		equip.appendChild(p)
		equip.appendChild(head)
		equip.appendChild(left)
		equip.appendChild(chest)
		equip.appendChild(right)
		equip.appendChild(boots)
		equip.appendChild(ring1)
		equip.appendChild(ring2)
		return equip;
	}
	static showDiscription(item, e){
		let disc = document.createElement('div')
		disc.id = 'disc';
		disc.style.top = e.pageY + 'px';
		disc.style.left = e.pageX + 'px';
		disc.innerHTML = item.getTooltip()
		let parrent = document.getElementById('inventory_container')
		parrent.appendChild(disc)
	}

	static closeDiscription(){
		let elem = document.getElementById('disc')
		if(elem){
			elem.parentNode.removeChild(elem)
		}
	}
}