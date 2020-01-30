import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HighScoreService } from '../services/highScore/high-score.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const highscoreMock ={
  snakeCollection: {
      valueChanges:() =>of({property: 'test'})  
  },
  puzzleCollection: {
      valueChanges:() =>of({property: 'test'})  
  },
  pongCollection: {
      valueChanges:() =>of({property: 'test'})  
  },
  tetrisCollection: {
      valueChanges:() =>of({property: 'test'})  
  },
  sudokuCollection: {
      valueChanges:() =>of({property: 'test'})  
  },
}
describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      declarations: [ ScoreBoardComponent ],
      providers:[
        { provide: HighScoreService, useValue: highscoreMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
