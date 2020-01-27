import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image.service';
import { of } from 'rxjs';
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
describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService,{ provide: AngularFireAuth, useValue: mockAngularFireAuth },]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
