import {Brick} from './brick'

export function buildLevel(game, level){
    let bricks=[]
    level.forEach((row, rowIndex)=>{
        row.forEach((brick, brickIndex) => {
            if( brick === 1){
                let position = {
                    x: 80 * brickIndex,
                    y: 50 + 24 * rowIndex
                }
                bricks.push(new Brick(game, position))
            }
        });
    }) 

    return bricks
}
export const Level1 = [
    [0,1,0,1,0,1,0,1,0,1,],
    [1,0,1,0,1,0,1,0,1,0,],
    [0,1,0,1,0,1,0,1,0,1,],
    [1,0,1,0,1,0,1,0,1,0,],
    [0,1,0,1,0,1,0,1,0,1,]

]
export const Level2 = [
    [1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,],
]
export const Level3 = [
    [1,1,1,1,1,1,1,1,1,1,],
    [1,0,0,0,0,0,0,0,0,1,],
    [1,1,1,1,1,1,1,1,1,1,],
]

export function randomLevelGenerator(){
    let left = []
    for(let i=0;i<5; i++){
        left.push(getRandomInt(3))
    }
    console.log(left)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }