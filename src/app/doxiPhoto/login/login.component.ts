import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;
  // data={email:'', pw:''}
  constructor(private auth: AuthenticationService, 
              private router: Router,
              public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data:{email:'', pw:''}) { }

  signIn(){
    // console.log(this.email)
    // console.log(this.data)
    this.auth.login({email: this.data.email, password: this.data.pw})
    .then(resolve=>{
      console.log(resolve)
      this.dialogRef.close();
      this.router.navigate(['upload'])
    }).catch(error=>this.errorMsg=error.message)
    // .then(a=>console.log(this.auth.isLoggedin()))
  }
  ngOnInit() {
  }

}
