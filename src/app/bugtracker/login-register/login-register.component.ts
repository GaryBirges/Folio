import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  email: String;
  pw: String;
  errorMsg: String;
  loggedIn=false;
  newUser=false;
  pw2:string;
  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
    // this.auth.authUser().subscribe(res=>{
    //   console.log(res)
    //   if(res!==null){
    //     this.loggedIn=true
    //     this.auth.authState= true
    //     // this.router.navigate(['films'])
    //   }
    // })
  }

  signIn(){
    console.log(this.email)
    this.auth.login({email: this.email, password: this.pw})
    .then(res=>{
      console.log(res)
      this.loggedIn=true
      this.auth.authState= true
      this.router.navigate(['bugtracker'])
    }).catch(error=>this.errorMsg=error.message)
  }

  register(){
    if(this.pw===this.pw2){
      this.errorMsg='';
      this.auth.signUp({email:this.email, password: this.pw}).then(res=>{
        console.log(res)
      }).catch(error=>this.errorMsg=error.message)
    }else{
      this.errorMsg="Passwords must match";
    }
  }

}
