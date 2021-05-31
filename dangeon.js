import { EnemyStack} from './enemyStack.js'

export class Dangeon{

    constructor(x, y , type, world){
        this.image = new Image()
        this.exit_x = 2
        this.exit_y = 0
        this.enemy = [ ]
        this.plan = []
        this.x = x
        this.y = y
        this.type = type
        switch(this.type){
            case 'cave':
                let reference = [
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,1,1,1,1],
                    [1,1,0,1,1,1,0,1,1,1],
                    [1,1,0,1,1,1,0,1,1,1],
                    [1,1,0,1,1,1,0,1,1,1],
                    [1,1,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1],
                ]
                this.enemy.push(new EnemyStack(world,6,6,['s']))
                    this.image.src = 'world_image/cave.png'
                    for(let i = 0; i < 10; i++){
                        let row = []
                        for(let j = 0; j < 10; j++){
                            let cell = {
                                "x" : j,
                                'y' : i,
                                "size": 100
                            }
                            cell.image = new Image()
                            if(reference[i][j] === 0){
                                cell.image.src = 'world_image/cave_floor.png'
                                cell.type = 0
                            }
                            else{
                                cell.image.src = 'world_image/black.png'
                                cell.type = 1
                            }
                         row.push(cell)
                        }
                        this.plan.push(row)
                    }             
                
            break
        }
    }

}