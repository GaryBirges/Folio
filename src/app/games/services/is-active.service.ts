import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class IsActiveService {
  public isActive: boolean = false;
  isAtiveChange: Subject<boolean> = new Subject<boolean>()
  constructor() {
    this.isAtiveChange.subscribe((value)=>{
      this.isActive = value
    })
   }

  active(){
    this.isAtiveChange.next(!this.isActive)
  }
}
