import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private route: ActivatedRoute,
    private router:Router,
    private db: AngularFirestore) { }

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
      // this.router.navigate(['bugtracker'])
      this.router.navigate(['../'],  {relativeTo: this.route})
    }).catch(error=>this.errorMsg=error.message)
  }

  register(){
    if(this.pw===this.pw2){
      this.errorMsg='';
      this.auth.signUp({email:this.email, password: this.pw}).then(res=>{
        console.log(res)
        this.db.collection('messengerUsers').doc(this.email as string).set({
          name:this.email,
          messagecomplex:[]
        })
        this.router.navigate(['../'],  {relativeTo: this.route})
      }).catch(error=>this.errorMsg=error.message)
    }else{
      this.errorMsg="Passwords must match";
    }
  }

}
