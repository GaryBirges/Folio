import { HostListener } from '@angular/core';

export class InputHandler {
    key
    game
    constructor(game){
      this.game=game
        // return this.handleKeyboardEvent(e)
    }
  //   @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) { 
  //   this.key = event.key;
  //   console.log(this.key)
  // }
  keydown(event){
    switch(event.keyCode) {
      case 37: 
          this.game.paddle.moveLeft()
          break;
      case 39: 
          this.game.paddle.moveRight()
          break;
    }
  }

  keyUp(event){
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
}