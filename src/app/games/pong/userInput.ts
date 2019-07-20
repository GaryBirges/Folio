import { HostListener } from '@angular/core';

export class InputHandler {
    key
    constructor(){
        // return this.handleKeyboardEvent(e)
    }
    @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
    console.log(this.key)
  }
}