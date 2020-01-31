import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

  // An anonymous user 
  const authState = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };
const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInAnonymously': Promise.reject({
      code: 'auth/operation-not-allowed'
    }),
    // 'signInWithPopup': Promise.reject(),
    // 'signOut': Promise.reject()
  }),
  authState: of(authState)
};
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    // service= new AuthenticationService(null)
    TestBed.configureTestingModule({
      providers: [
        // AuthenticationService,
        { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ]
    });
    // service = TestBed.get(AuthenticationService)
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
//     expect(service['authState']).toBe(null);
// expect((service as any).authState).toBe(null);
  }));
});
