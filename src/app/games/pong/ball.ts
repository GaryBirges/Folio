import {detectCollosion} from './collosionDetection'

export class Ball{
    image:HTMLImageElement
    speed: { x: number; y: number; };
    position: { x: number; y: number; };
    size: number;
    gameWidth: number;
    gameHeight: number;
    game
    constructor(game){
        this.game=game
        this.image= new Image()
        this.image.src="./assets/BallIcon.png"
        this.size = this.game.gameWidth/50
        this.reset()
    }

    reset(){
        this.speed= {x: 4, y:-2}
        this.position = { x: this.game.gameWidth/2, y:this.game.gameHeight*3/4}  
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }

    update(deltaTime){
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if(this.position.x + this.size > this.game.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x
        }
        if( this.position.y < 0){
            this.speed.y = -this.speed.y
        }
        if(this.position.y + this.size > this.game.gameHeight ){
            this.game.lives--;
            this.reset()
        }
        if(detectCollosion(this, this.game.paddle)){
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y -this.size
        }
    }
}