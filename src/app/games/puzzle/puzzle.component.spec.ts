import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleComponent } from './puzzle.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GridsterModule } from 'angular-gridster2';
import {MatCardModule} from '@angular/material/card';
import { HighScoreService } from '../services/highScore/high-score.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IsActiveService } from '../services/is-active.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}
const iasMock = {
  isAtiveChange: of( {active:true}) 
}
const highscoreMock ={
  collection:(someString) => {
    // return mocked collection here
}
}
describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule, 
        ReactiveFormsModule,
        MatInputModule,
        GridsterModule,
        MatCardModule,
        // MatFormFieldModule,
        MatExpansionModule,
        MatGridListModule,
        BrowserAnimationsModule
      ],
      declarations: [ PuzzleComponent ],
      providers:[
        { provide: IsActiveService, useValue: iasMock },
        { provide: HighScoreService, useValue: highscoreMock },
        { provide: MatDialog, useValue: MatDialogMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
