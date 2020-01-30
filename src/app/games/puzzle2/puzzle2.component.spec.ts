import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Puzzle2Component } from './puzzle2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Puzzle2Component', () => {
  let component: Puzzle2Component;
  let fixture: ComponentFixture<Puzzle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule, 
        ReactiveFormsModule,
      ],
      declarations: [ Puzzle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Puzzle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
