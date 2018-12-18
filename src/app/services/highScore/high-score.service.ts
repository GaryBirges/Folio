import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }
@Injectable({
  providedIn: 'root'
})

export class HighScoreService {
  currentUser
  // items: Observable<any[]>;
  // private itemDoc: AngularFirestoreDocument<Item>;
  // tasks: Observable<any[]>;
  puzzleCollection : AngularFirestoreCollection
  puzzleScores

  constructor(db: AngularFirestore) { 
    // this.items = db.collection('items').valueChanges();
    // this.itemDoc = db.doc<Item>('items/1');
    // this.tasks = this.itemDoc.collection<Item>('tasks').valueChanges();
   
    this.puzzleCollection=db.collection('Puzzle')
    this.puzzleCollection.valueChanges().subscribe(res=>{
      this.puzzleScores=res
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
    console.log(this.tasks)
  }
  // update(item: Item) {
  //   this.itemDoc.update(item);
  // }
}
