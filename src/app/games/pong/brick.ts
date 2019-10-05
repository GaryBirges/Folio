import {detectCollosion} from './collosionDetection'

export class Brick {
    game: any;
    image: HTMLImageElement;
    // imageOak: HTMLImageElement;
    position: { x: number; y: number; };
    width: number;
    height: number;
    remove:boolean;
    blockType:number
    constructor(game, position, blockType){
        this.game=game
        this.image= new Image()
        this.blockType=blockType
        if(this.blockType==1){
            this.image.src="./assets/lava.jpg"
        }else if(this.blockType==2){
            this.image.src="./assets/oak.jpg"
        }
        // this.imageOak= new Image()
        this.position = position
        
        this.width = this.game.gameWidth/10;
        this.height = this.game.gameHeight/24;

        this.remove=false;
    }

    update(){
        if(detectCollosion(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y
            this.remove=true;
            // console.log(this.blockType)
            this.game.score+=this.blockType
        }


    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}