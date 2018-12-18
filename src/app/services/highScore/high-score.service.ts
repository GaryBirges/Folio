import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }
@Injectable({
  providedIn: 'root'
})

export class HighScoreService {
  currentUser

  puzzleCollection : AngularFirestoreCollection
  snakeCollection : AngularFirestoreCollection
  puzzleScores
  snakeScores

  snakeDoc: AngularFirestoreDocument<any>
  score: Observable<any>
  
  constructor(db: AngularFirestore,
              afs: AngularFirestore) { 
    // this.items = db.collection('items').valueChanges();
    // this.itemDoc = db.doc<Item>('items/1');
    // this.tasks = this.itemDoc.collection<Item>('tasks').valueChanges();
    this.snakeDoc =afs.doc('Snake')
    this.score = this.snakeDoc.valueChanges()
   
    this.puzzleCollection=db.collection('Puzzle')
    this.snakeCollection=db.collection('Snake')
    this.puzzleCollection.valueChanges().subscribe(res=>{
      this.puzzleScores=res
      console.log(this.puzzleScores)
    })
    this.snakeCollection.valueChanges().subscribe(res=>{
      this.snakeScores=res
      console.log(res)
    })
    // console.log(a)
  }

  setUser(user){
    this.currentUser=user
  }
  getUser(){
    return this.currentUser
  }
  addScoreToBoard(game, score){
    console.log(score)
    // console.log(this.tasks)
  }
  // updateScores(item: Item) {
  updateScores() {
    let item= 
    this.snakeDoc.update(item);
  }
}
