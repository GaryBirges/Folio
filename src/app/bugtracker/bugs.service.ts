import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  bugsList = [  ]
  bugsListSubj = new BehaviorSubject(null)

  bugsCollection : AngularFirestoreCollection
  constructor(db: AngularFirestore,
              private auth:AuthService) {
    this.bugsCollection= db.collection('BugsList', ref=>ref.orderBy('createdDate', 'desc'))
    this.bugsCollection.valueChanges({ idField: 'id' }).subscribe(res=>{
      this.bugsList=res
      console.log(res)
      this.bugsListSubj.next(this.bugsList)
    })
   }

   returnCollection(collection){
      return this.bugsCollection.doc(collection).collection('events', ref=>ref.orderBy('createdDate', 'asc'))
   }

   addBug(bug){
    this.bugsCollection.add(bug).then((docRef)=> {
      console.log(docRef.id)
      const event = {
        createdBy: this.auth.displayName,
        createdDate: bug.createdDate,
        action: 'Bug Created',
        message: ''
      }
      this.returnCollection(docRef.id).add(event).then(()=>{
        console.log("Document successfully written!");
      })
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
   }

   addComment(collection, comment){
    const event = {
      createdBy: this.auth.displayName,
      createdDate: Date.now(),
      action: 'Commented',
      message:comment
    }
    this.returnCollection(collection).add(event).then(docRef=>{
      console.log(docRef)
    })
   }
   changeStatus(bug, statusFrom, statusTo){
    this.bugsCollection.doc(bug.id).update(bug)
    const event = {
      createdBy: this.auth.displayName,
      createdDate: Date.now(),
      action: `Status changed from ${statusFrom} to ${statusTo}`,
      message:''
    }
    this.returnCollection(bug.id).add(event).then(docRef=>{
      console.log(docRef)
    })
   }

   editBug(bug){
     this.bugsCollection.doc(bug.id).update(bug)
     const event = {
      createdBy: this.auth.displayName,
      createdDate: Date.now(),
      action: `Bug edited`,
      message:''
    }
    this.returnCollection(bug.id).add(event).then(docRef=>{
      console.log(docRef)
    })
   }

}
