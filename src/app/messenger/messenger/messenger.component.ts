import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, subscribeOn } from 'rxjs/operators';
import { AuthService } from 'src/app/bugtracker/auth.service';
import { LoginComponent } from 'src/app/doxiPhoto/login/login.component';
import { AddconnectionComponent } from '../addconnection/addconnection.component';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  messageCollection:AngularFirestoreCollection
  messages
  messageForm:FormGroup
  authState
  messengerUsers
  connections:any
  currentReceiver
  messageDatabasesCollection
  allUsers
  constructor( private db: AngularFirestore,
              private fb:FormBuilder,
              private  dialog:MatDialog,
              public auth: AuthService) {
    this.messengerUsers = db.collection('messengerUsers')
    this.messengerUsers.valueChanges().subscribe(res=>{
      this.allUsers= res
      this.connections = res.find((x:any) =>x.name == this.auth.displayName);

      // if (this.connections.messagecomplex.length) {
      //   this.selectConnection(this.connections.messagecomplex[0])
      // }
    })
    this.messageDatabasesCollection = db.collection('messenger')
   }

  ngOnInit() {
    this.createCommentForm();
    this.authState=this.auth.authState
  }

  selectConnection(member) {
    this.currentReceiver = member
    this.resetLastMessage()
    this.messageCollection = this.messageDatabasesCollection.doc(member.database).collection('messages')
    this.messageCollection.valueChanges().subscribe(res=>{
      this.messages=res
    })
  }

  addConnection(){
    let data = {
      allusers :this.allUsers.filter(user=>user.name !== this.auth.displayName),
      currentusers: this.connections
    }
    let dialogRef = this.dialog.open(AddconnectionComponent, {
      width: '450px',
      data: data
    });
    dialogRef.afterClosed().subscribe(selectedUser => {
      if(selectedUser !== undefined) {
        let dbName= Date.now().toString()
        selectedUser.messagecomplex.push({database:dbName,user:this.auth.displayName, lastMessage: null, lastSeenDate:dbName, newMessageCount:0})
        this.messengerUsers.doc(selectedUser.name).update(selectedUser)

        this.connections.messagecomplex.push({database:dbName, user:selectedUser.name, lastMessage: null, lastSeenDate:dbName, newMessageCount:0})

        this.messengerUsers.doc(this.auth.displayName).update(this.connections)

      }
    });
  }
  addMessage() {
    let message = {message:this.messageForm.value.message,
                   sender: this.auth.displayName,
                   timestamp: Date.now()
                  }
    this.messageCollection.add(message)
    this.addLastMessage(message)
    this.messageForm.reset()
  }

  addLastMessage(message) {
    // look for the receiver, then look for the current user in receivers messagecomplex, then update last message and message count
    for (let i = 0; i < this.allUsers.length; i++) {
      if(this.allUsers[i].name == this.currentReceiver.user) {
        for (let j = 0; j < this.allUsers[i].messagecomplex.length; j++){
          if (this.allUsers[i].messagecomplex[j].user === this.auth.displayName) {
            this.allUsers[i].messagecomplex[j].lastMessage = message.message;
            this.allUsers[i].messagecomplex[j].newMessageCount++;
            this.allUsers[i].messagecomplex = this.allUsers[i].messagecomplex.sort((a, b) => a.newMessageCount < b.newMessageCount ? 1: -1)
            let update = this.allUsers[i]
            this.messengerUsers.doc(this.currentReceiver.user).update(update)
            break;
          }
        }
      }
    }
  }
  resetLastMessage () {
    for (let i = 0; i < this.connections.messagecomplex.length; i++) {
      if(this.connections.messagecomplex[i].user == this.currentReceiver.user) {
        this.connections.messagecomplex[i].lastMessage = null;
        this.connections.messagecomplex[i].newMessageCount = 0;
      }
    }
    this.messengerUsers.doc(this.auth.displayName).update(this.connections)
  }

  createCommentForm(){
    this.messageForm = this.fb.group({
      message:[{value:'', disabled:false}, Validators.required, ]
    })
  }

  getAuthState() {
    return this.authState
  }

}
