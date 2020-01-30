import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisComponent } from './tetris.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { HighScoreService } from '../services/highScore/high-score.service';
import { of } from 'rxjs';

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
describe('TetrisComponent', () => {
  let component: TetrisComponent;
  let fixture: ComponentFixture<TetrisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule
      ],
      declarations: [ TetrisComponent ],
      providers:[
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: HighScoreService, useValue: highscoreMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
