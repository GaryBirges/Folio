import { TestBed, inject } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

const AngularFirestoreStub = {
  // I just mocked the function you need, if there are more, you can add them here.
  collection: (someString) => {
      // return mocked collection here
  }
};
export class FirebaseStorageStub {

  public ref(path: string) {
      return {
        getDownloadURL() {
          return of(path)
        }
      }
  }
}


describe('UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadService, 
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireStorage, useValue: FirebaseStorageStub },
      ]
    });
  });

  it('should be created', inject([UploadService], (service: UploadService) => {
    expect(service).toBeTruthy();
  }));
});
