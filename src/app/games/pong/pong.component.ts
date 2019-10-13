import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Game } from './game';
import {randomLevelGenerator} from './levels'
import { HighScoreService } from '../services/highScore/high-score.service';

const WIDTH = 800
const HEIGHT = 600
@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent implements OnInit {
  @ViewChild('gameField', { static: true }) gameField: ElementRef
  ctx: CanvasRenderingContext2D;
  // paddle
  lastTime=0
  // ball
  game
  // width
  // height
  
  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) { 
    switch(event.keyCode) {
      case 37: 
          this.game.paddle.moveLeft()
          break;
      case 39: 
          this.game.paddle.moveRight()
          break;
      case 27:
          this.game.togglePause()
          break;
      case 32:
          this.game.start()
          break;
    }
  }
  @HostListener('document:keyup', ['$event'])
  keyUp(event: KeyboardEvent) { 
    switch(event.keyCode) {
      case 37: 
        if(this.game.paddle.speed<0)
          this.game.paddle.stop()
          break;
      case 39: 
        if(this.game.paddle.speed>0)
          this.game.paddle.stop()
          break;
    }
  }

  constructor(private highScore: HighScoreService,) { }

  ngOnInit() {
    this.startGame()
  }
  ngAfterViewInit(): void {
    // this.width=this.gameField.nativeElement.clientWidth
    // this.height=this.gameField.nativeElement.clientHeight
    console.log(this.gameField)
    this.ctx = (<HTMLCanvasElement>this.gameField.nativeElement).getContext('2d');
    
  }
  
  
  gameLoop(timeStamp){
    let deltaTime= timeStamp-this.lastTime
    this.lastTime=timeStamp

    this.ctx.clearRect(0,0,WIDTH,HEIGHT)
    this.game.update(deltaTime)
    this.game.draw(this.ctx)
    if(this.game.gameState!=3){
      requestAnimationFrame(this.gameLoop.bind(this))
    }else{
      // console.log(this.game.score)
      // setTimeout(() => {
        this.startGame() 
      // }, 3000);
    }
  }

  startGame(){
    this.game= new Game(WIDTH, HEIGHT, this.highScore)
    // this.game= new Game(WIDTH, HEIGHT, this.highScore)
    requestAnimationFrame(this.gameLoop.bind(this))
  }
  
}
