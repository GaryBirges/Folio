import {Brick} from './brick'

export function buildLevel(game, level){
    let bricks=[]
    console.log(level)
    level.forEach((row, rowIndex)=>{
        row.forEach((brick, brickIndex) => {
            if( brick === 1|| brick === 2){
                let position = {
                    x: game.gameWidth/10 * brickIndex,  //brickWidth*index
                    y: 70 + ((game.gameHeight/24) * rowIndex)  //brickHeight*row +70 on top
                }
                bricks.push(new Brick(game, position, brick))
            } 
        });
    })  
    console.log(bricks)
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
    let level:Array<Array<number>>=[]
    for(let i=0;i<getRandomInt(0,3)+1; i++){
        level.push(randomRow())
    }
    return level 
}
function randomRow(){
    let row:Array<number>=[]
    for(let i=0;i<5; i++){
        let num= getRandomInt(0,3)
        row.push(num)
        row.unshift(num)
    }
    return row 
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
  }