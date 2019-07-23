import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Game } from './game';


const WIDTH = 800
const HEIGHT = 600
@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent implements OnInit {
  @ViewChild('gameField') gameField: ElementRef
  ctx: CanvasRenderingContext2D;
  // paddle
  lastTime=0
  // ball
  game
  
  @HostListener('document:keydown', ['$event'])//might need to be moved to userinputs
  keyDown(event: KeyboardEvent) { 
    switch(event.keyCode) {
      case 37: 
          this.game.paddle.moveLeft()
          break;
      case 39: 
          this.game.paddle.moveRight()
          break;
    }
  }
  @HostListener('document:keyup', ['$event'])//might need to be moved to userinputs
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

  constructor() { }

  ngOnInit() {
    this.game= new Game(WIDTH, HEIGHT)
  }
  ngAfterViewInit(): void {
    this.ctx = (<HTMLCanvasElement>this.gameField.nativeElement).getContext('2d');
    setTimeout(() => {
      
      this.game.start()
    }, 2000);
    // this.game.paddle.draw(this.ctx)
    requestAnimationFrame(this.gameLoop.bind(this))
  }
  
  
  gameLoop(timeStamp){
    let deltaTime= timeStamp-this.lastTime
    this.lastTime=timeStamp

    this.ctx.clearRect(0,0,WIDTH, HEIGHT)
    this.game.update(deltaTime)
    this.game.draw(this.ctx)
    
    requestAnimationFrame(this.gameLoop.bind(this))
  }
}
