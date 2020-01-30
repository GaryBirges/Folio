import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuGameComponent } from './sudoku-game.component';
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
describe('SudokuGameComponent', () => {
  let component: SudokuGameComponent;
  let fixture: ComponentFixture<SudokuGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule
      ],
      declarations: [ SudokuGameComponent ],
      providers:[
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: HighScoreService, useValue: highscoreMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
