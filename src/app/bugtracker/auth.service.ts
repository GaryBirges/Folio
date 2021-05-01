import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = false
  displayName
  private user: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth) {
    this.user= this.afAuth.authState
    this.user.pipe(
      tap(user => {
        if (user) {
          this.authState=true
          this.displayName=user.displayName || user.email
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
     return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(userData => {
      userData.user.updateProfile({
        displayName: user.email,
      })})
   }
   logout(){
     return this.afAuth.auth.signOut();
   }

  //  authUser(){
  //    return this.user;
  //  }
   getAuthState(){
     console.log(this.authState)
    return this.authState
   }
}
