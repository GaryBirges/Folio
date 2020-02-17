import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

  // // An anonymous user 
  // const authState = {
  //   displayName: null,
  //   isAnonymous: true,
  //   uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  // };
// const mockAngularFireAuth: any = {
//   auth: jasmine.createSpyObj('auth', {
//     'signInAnonymously': Promise.reject({
//       code: 'auth/operation-not-allowed'
//     }),
//     // 'signInWithPopup': Promise.reject(),
//     // 'signOut': Promise.reject()
//   }),
//   authState: of(authState)
// };
/****************************** */
const credentialsMock = {
  email: 'abc@123.com',
  password: 'password'
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};
const fakeAuthState = new BehaviorSubject(null); // <= Pay attention to this guy

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and
      .callFake(fakeSignInHandler),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(fakeSignOutHandler),
  },
};
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;
  let subscription
  beforeEach(() => {
    // service= new AuthenticationService(null)
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        // { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
      ]
    });
    service = TestBed.get(AuthenticationService)
    afAuth = TestBed.get(AngularFireAuth);
  });

  afterEach(() => {
    fakeAuthState.next(null);

    // isAuth$.unsubscribe();
    if(subscription)
    subscription.unsubscribe();
  });



  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should not be initially authenticated', () => {
    subscription=service.authUser().subscribe(res=>
      expect(res).toBe(null)
      )
  });

  it('should be authenticated after logging in', () => {
    service.login(credentialsMock);

    expect(afAuth.auth.signInWithEmailAndPassword)
      .toHaveBeenCalledWith(credentialsMock.email, credentialsMock.password);
      service.authUser().subscribe(res=>{
        if(res!==null){
          expect(res.uid).toBe(userMock.uid)  
        }

      })  

  });

  it("should be unauthenticated after logout", ()=>{
    service.login(credentialsMock);
    service.authUser().subscribe(res=>{
      if(res!==null){
        expect(res.uid).toBe(userMock.uid)  
      }
    }) 

    service.logout()
    service.authUser().subscribe(res=>{
        expect(res).toBe(null)  
    }) 
  })
});
