import {Paddle} from './paddle'
import {Ball} from './ball'
import {Brick} from './brick'

import {buildLevel, Level1} from './levels'

export class Game {

    ball
    paddle
    bricks
    gameWidth
    gameHeight
    gameElements

    constructor(gameWidth, gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight

    }

    start(){
        this.paddle= new Paddle(this)
        this.ball= new Ball(this)

       this.bricks = buildLevel(this, Level1) 

        this.gameElements = [
            this.ball,
            this.paddle,
            ...this.bricks
        ]
    }

    update(deltaTime){
        this.gameElements.forEach(element => {
            element.update(deltaTime)
        });

        this.gameElements = this.gameElements.filter(elem=>!elem.remove)
    }
    
    draw(ctx){
        this.gameElements.forEach(element => {
            element.draw(ctx)
        });
    }
}