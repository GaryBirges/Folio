import {Paddle} from './paddle'
import {Ball} from './ball'

export class Game {

    ball
    paddle
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

        this.gameElements = [
            this.ball,
            this.paddle
        ]
    }

    update(deltaTime){
        this.gameElements.forEach(element => {
            element.update(deltaTime)
        });
    }
    
    draw(ctx){
        this.gameElements.forEach(element => {
            element.draw(ctx)
        });
    }
}