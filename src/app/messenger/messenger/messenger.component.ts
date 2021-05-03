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
      console.log(res)
      console.log(this.connections)
    })
    this.messageDatabasesCollection = db.collection('messenger')

   }

  ngOnInit() {
    this.createCommentForm();
    console.log()
    this.authState=this.auth.authState
  }

  selectConnection(member) {
    console.log(member)
    this.currentReceiver = member
    this.messageCollection = this.messageDatabasesCollection.doc(member.database).collection('messages')
    this.messageCollection.valueChanges().subscribe(res=>{
      console.log(res)
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
      console.log(selectedUser);
      if(selectedUser !== undefined) {
        let dbName= Date.now().toString()
        selectedUser.messagecomplex.push({database:dbName,user:this.auth.displayName})
        this.messengerUsers.doc(selectedUser.name).update(selectedUser)

        this.connections.messagecomplex.push({database:dbName, user:selectedUser.name})
        console.log(this.connections)
        this.messengerUsers.doc(this.auth.displayName).update(this.connections)

      }

    });

  }
  addMessage() {
    console.log(this.messageForm.value.message)
    let message = {message:this.messageForm.value.message,
                   sender: this.auth.displayName,
                   timestamp: Date.now()
                  }
                  console.log(message)
    this.messageCollection.add(message)
    this.messageForm.reset()
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
