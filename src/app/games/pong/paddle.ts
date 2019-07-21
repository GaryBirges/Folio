export class Paddle {
    height:number
    width:number
    maxSpeed:number
    position:{x:number, y:number}
    speed:number
    gameWidth
    gameHeight
    constructor(game){
        this.width=150
        this.height=20

        this.maxSpeed = 7
        this.speed = 0

        this.gameHeight=game.gameHeight
        this.gameWidth=game.gameWidth

        this.position = {
            x:game.gameWidth/2-this.width/2,
            y:game.gameHeight-this.height-10
        }
        // console.log(this.position)
    }
    draw(ctx){
        ctx.fillStyle="#87CEFA"
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
    }

    update(deltaTime){
        // this.position.x+=5/deltaTime
        this.position.x += this.speed
        if(this.position.x <0) this.position.x=0
        if(this.position.x+this.width>this.gameWidth) this.position.x = this.gameWidth - this.width
    }
    moveLeft(){
        this.speed= -this.maxSpeed
    }
    moveRight(){
        this.speed= this.maxSpeed
    }
    stop(){
        this.speed=0
    }
}