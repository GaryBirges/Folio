import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighScoreService {
  currentUser
  constructor() { }

  setUser(user){
    this.currentUser=user
  }
  getUser(){
    return this.currentUser
  }
  addScoreToBoard(game, score){
    console.log(score)
  }
}
