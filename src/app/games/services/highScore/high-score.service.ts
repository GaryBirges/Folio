import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AskForNameComponent } from './ask-for-name/ask-for-name.component';

export interface Item { name: string; }
@Injectable({
  providedIn: 'root'
})

export class HighScoreService {
  currentUser

  puzzleCollection : AngularFirestoreCollection
  snakeCollection : AngularFirestoreCollection
  pongCollection : AngularFirestoreCollection
  puzzleScores
  snakeScores
  pongScores

  snakeDoc: AngularFirestoreDocument<any>
  puzzleDoc: AngularFirestoreDocument<any>
  score: Observable<any>
  
  constructor(db: AngularFirestore,
              public dialog: MatDialog,
              // afs: AngularFirestore
              ) { 
    // this.items = db.collection('items').valueChanges();
    // this.itemDoc = db.doc<Item>('items/1');
    // this.tasks = this.itemDoc.collection<Item>('tasks').valueChanges();
    // this.snakeDoc =afs.collection('Snake').doc('1')
    // this.puzzleDoc= afs.collection('Puzzle').doc('1')
    // this.score = this.snakeDoc.valueChanges()
   //GET STUFF FROM DB
    this.puzzleCollection=db.collection('Puzzle')
    this.snakeCollection=db.collection('Snake')
    this.pongCollection=db.collection('Pong')
    this.puzzleCollection.valueChanges().subscribe(res=>{
      this.puzzleScores=res
      console.log(this.puzzleScores)
    })
    this.snakeCollection.valueChanges().subscribe(res=>{
      this.snakeScores=res
      console.log(res)
    })
    this.pongCollection.valueChanges().subscribe(res=>{
      this.pongScores=res
      console.log(res)
    })
  }

  setUser(user){
    this.currentUser=user
  }
  getUser(){
    return this.currentUser
  }
  addScoreToBoard(game, score){
    console.log(score)
    score.name=this.currentUser
    if(game=='Snake'){
      this.snakeCollection.add(score)
    }else if(game=='Puzzle'){
      this.puzzleCollection.add(score)
    }else if(game=='Pong'){
      this.pongCollection.add(score)
    }
  }
  // updateScores(item: Item) {

  //dont know if its needed
  updateScores(score) {
    // let item= 
    this.snakeDoc.update(score);
  }

  askForName(game,score){
    let name =''
    let dialogRef = this.dialog.open(AskForNameComponent, {
      width: '250px',
      data: {name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result!==undefined){
        this.setUser(result)
        this.addScoreToBoard(game, score)
      }
      // this.animal = result;
    });
  }

  addScore(game, score){
    if(this.getUser()==undefined){
      console.log("done")
      this.askForName(game, score)
    }else{
      this.addScoreToBoard(game, score)
    }
  }
}
