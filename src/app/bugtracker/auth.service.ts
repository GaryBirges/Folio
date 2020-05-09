import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = false
  private user: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth) {
    this.user= this.afAuth.authState
    this.user.pipe(
      tap(user => {
        if (user) {
          this.authState=true
        } else {
          this.authState=false
        }
      })
    )
    .subscribe()
   }

   login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
   }

   signUp(user){
     return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
   }
   logout(){
     return this.afAuth.auth.signOut();
   }

  //  authUser(){
  //    return this.user;
  //  }
   getAuthState(){
    return this.authState
   }
}
