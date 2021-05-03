import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/bugtracker/auth.service';

@Component({
  selector: 'app-addconnection',
  templateUrl: './addconnection.component.html',
  styleUrls: ['./addconnection.component.scss']
})
export class AddconnectionComponent implements OnInit {
  users
  constructor(public dialogRef: MatDialogRef<AddconnectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{allusers:[], currentusers:[]}) {
      this.users = data.allusers.filter(e=>{
        return data.currentusers['messagecomplex'].indexOf(e['name'])<0
      })
  }
  ngOnInit() {

  }
  userSelected(user) {
    this.dialogRef.close(user);
  }
}
