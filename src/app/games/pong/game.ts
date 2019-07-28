import {Paddle} from './paddle'
import {Ball} from './ball'
import {Brick} from './brick'

import {buildLevel, Level1, Level2, Level3, randomLevelGenerator} from './levels'

const GAMESTATES={
    PAUSED:     0,
    RUNNING:    1,
    MENU:       2,
    GAMEOVER:   3,
    NEWLEVEL:   4
}


export class Game {

    ball:Ball
    paddle:Paddle
    bricks:Brick[]
    gameWidth:number
    gameHeight:number
    gameElements=[]
    gameState:number
    lives:number
    levels=[]
    currentLevel:number
    score:number

    constructor(gameWidth, gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight
        this.gameState= GAMESTATES.MENU
        this.paddle= new Paddle(this)
        this.ball= new Ball(this)
        this.bricks=[]
        this.lives=3
        this.score=0
        // this.levels = [Level1, Level2, Level3]
        // this.currentLevel = 0
    }

    start(){
        if(this.gameState !==GAMESTATES.MENU && this.gameState!== GAMESTATES.NEWLEVEL) return
        // this.bricks = buildLevel(this, this.levels[this.currentLevel]) 
        this.bricks = buildLevel(this, randomLevelGenerator()) 
        this.ball.reset()
        this.gameElements = [this.ball, this.paddle]

        this.gameState= GAMESTATES.RUNNING
    }

    update(deltaTime){
        if(this.lives == 0) this.gameState=GAMESTATES.GAMEOVER

        if(this.gameState == GAMESTATES.PAUSED || this.gameState == GAMESTATES.MENU || this.gameState == GAMESTATES.GAMEOVER) return

        if(this.bricks.length=== 0){
            // this.currentLevel++; 
            this.gameState=GAMESTATES.NEWLEVEL
            this.start()
        }

        // if(this.gameState== GAMESTATES.GAMEOVER){
        //     setTimeout(() => {
        //         this.currentLevel=0; 
        //         this.gameState=GAMESTATES.MENU
        //         this.start()
        //     }, 1000);
        // }

        [...this.gameElements, ...this.bricks].forEach(element => {
            element.update(deltaTime)
        });

        this.bricks = this.bricks.filter(elem=>!elem.remove)
    }
    
    draw(ctx){
        [...this.gameElements, ...this.bricks].forEach(element => {
            element.draw(ctx)
        });
        
        if(this.gameState==GAMESTATES.PAUSED){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill();
            ctx.font ="30px Arial";
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth/2, this.gameHeight/2)
        }else if(this.gameState==GAMESTATES.MENU){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill();
            ctx.font ="30px Arial";
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to Start", this.gameWidth/2, this.gameHeight/2)
        }else if(this.gameState==GAMESTATES.GAMEOVER){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill();
            ctx.font ="30px Arial";
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2)
        }
    }

    togglePause(){
        if(this.gameState ==GAMESTATES.PAUSED){
            this.gameState=GAMESTATES.RUNNING
        }else{
            this.gameState=GAMESTATES.PAUSED
        }
    }
}