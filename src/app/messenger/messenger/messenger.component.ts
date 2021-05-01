import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/bugtracker/auth.service';
import { LoginComponent } from 'src/app/doxiPhoto/login/login.component';

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
  connections
  constructor( private db: AngularFirestore,
              private fb:FormBuilder,
              private  dialog:MatDialog,
              public auth: AuthService) {
    this.messageCollection =db.collection('messenger')
    // this.messageForm.get().statusChanges(snapshotChanges)
    this.messageCollection.valueChanges().subscribe(res=>{
      this.messages=res
      console.log(res)
    })

    
   }

  ngOnInit() {
    this.createCommentForm();
    console.log()
    this.authState=this.auth.authState
  }
  addMessage() {
    console.log(this.messageForm.value.message)
    let message = {message:this.messageForm.value.message,
                   receiver:'',
                   sender: this.auth.displayName,
                   timestamp: Date.now()
                  }
                  console.log(message)
    this.messageCollection.add(message)
  }

  createCommentForm(){
    this.messageForm = this.fb.group({
      message:[{value:'', disabled:false}, Validators.required, ]
    })
  }

  openLogin(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      data: {name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  getAuthState() {
    return this.authState
  }

}
