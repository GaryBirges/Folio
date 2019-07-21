import {detectCollosion} from './collosionDetection'

export class Brick {
    game: any;
    image: HTMLImageElement;
    position: { x: number; y: number; };
    width: number;
    height: number;
    remove:boolean;
    constructor(game, position){
        this.game=game
        this.image= new Image()
        this.image.src="../../../assets/lava.jpg"
        this.position = position
        this.width = 80;
        this.height = 25;

        this.remove=false;
    }

    update(){
        if(detectCollosion(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y
            this.remove=true;
        }


    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}