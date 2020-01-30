import { TestBed } from '@angular/core/testing';

import { HighScoreService } from './high-score.service';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
const AngularFirestoreStub = {
  // I just mocked the function you need, if there are more, you can add them here.
  collection: (someString) => {
    return {
      valueChanges:() =>of({property: 'test'})  
    }
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
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
  close(){
    return of({closed:true})
  }
}
describe('HighScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      HighScoreService,
      { provide: AngularFirestore, useValue: AngularFirestoreStub },
      { provide: AngularFireStorage, useValue: FirebaseStorageStub },
      { provide: MatDialogRef, useValue: {} },
      { provide: MatDialog, useValue: MatDialogMock },
      { provide: MAT_DIALOG_DATA, useValue: {name: 'testname', score:{score:1}}}
    ]
  }));

  it('should be created', () => {
    const service: HighScoreService = TestBed.get(HighScoreService);
    console.log(service)
    expect(service).toBeTruthy();
  });
});
