import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class MessageService implements OnInit{
 messages: string;
 messageLegacy: string;

 add(message: string, timeout?: number) {
   this.messages=message;
  //  console.log(message)
    // setTimeout(()=>this.messages.pop(), 3000)
    setTimeout(()=>this.clear(), timeout||60000)
 }
 addLegacy(message:string){
    this.messageLegacy=message;
 }

 clear() {
   this.messages = '';
 }

 constructor(){
  // this.add()
 }
 getLegacyErrorMessage(){
   return this.messageLegacy;
 }

 ngOnInit(){

 }

}
