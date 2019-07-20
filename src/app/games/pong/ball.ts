export class Ball{
    image:HTMLImageElement
    speed
    position
    size
    gameWidth
    gameHeight
    game
    constructor(game){
        this.game=game
        this.image= new Image()
        this.image.src="../../../assets/Basketball_Ball_Icon.png"
        this.speed= {x: 4, y:2}
        this.position = { x: 10, y:10}
        this.size = 15
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
        if(this.position.y + this.size > this.game.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y
        }
        let ballBottom = this.position.y+this.size
        let paddleTop = this.game.paddle.position.y
        let paddleLeft = this.game.paddle.position.x
        let paddleRight = this.game.paddle.position.x+this.game.paddle.width
        if(ballBottom >= paddleTop && this.position.x>= paddleLeft && this.position.x + this.size <= paddleRight){
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y -this.size
        }
    }
}