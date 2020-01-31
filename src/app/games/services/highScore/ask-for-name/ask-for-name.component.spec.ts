import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForNameComponent } from './ask-for-name.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
describe('AskForNameComponent', () => {
  let component: AskForNameComponent;
  let fixture: ComponentFixture<AskForNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule, 
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ AskForNameComponent ],
      providers:[{ provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {name: 'testname', score:{score:1}}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
