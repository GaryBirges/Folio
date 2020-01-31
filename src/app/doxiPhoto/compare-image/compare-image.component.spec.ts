import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareImageComponent } from './compare-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('CompareImageComponent', () => {
  let component: CompareImageComponent;
  let fixture: ComponentFixture<CompareImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [    ReactiveFormsModule, MatDialogModule ],
      declarations: [ CompareImageComponent ], 
      providers:[{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {image:{url:''},toCompare:{url:''}}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form', ()=>{
    expect(component.rangeForm).toBeTruthy()
  })
  it('should set width if user changes form value', ()=>{
    component.rangeForm.patchValue({slider:65})
    expect(component.width).toBe('65%')
  })
});
