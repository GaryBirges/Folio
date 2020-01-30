import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PongComponent } from './pong.component';
import {MatCardModule} from '@angular/material/card';
import { UploadService } from 'src/app/doxiPhoto/services/upload.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HighScoreService } from '../services/highScore/high-score.service';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}
const highscoreMock ={
  collection:(someString) => {
    // return mocked collection here
}
}

describe('PongComponent', () => {
  let component: PongComponent;
  let fixture: ComponentFixture<PongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule
      ],
      declarations: [ PongComponent ],
      providers: [
        { provide: HighScoreService, useValue: highscoreMock },
        { provide: MatDialog, useValue: MatDialogMock },
        // { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
