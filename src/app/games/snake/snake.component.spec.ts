import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeComponent } from './snake.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
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
describe('SnakeComponent', () => {
  let component: SnakeComponent;
  let fixture: ComponentFixture<SnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule
      ],
      declarations: [ SnakeComponent ],
      providers:[
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: HighScoreService, useValue: highscoreMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
