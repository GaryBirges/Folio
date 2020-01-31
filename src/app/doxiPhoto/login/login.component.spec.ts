import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of, Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
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
let router = {
  navigate: jasmine.createSpy('navigate')
}
let AuthenticationServiceStub={
  login (){return Promise.resolve({email:'email', pw:'pw'}).then(()=>console.log())}
}
fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule, 
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
      declarations: [ LoginComponent,  ],
      providers:[
        { provide: MatDialog, useValue: MatDialogMock },
        { provide: Router, useValue: router },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {email:'email', pw:'pw'}},
        { provide: AuthenticationService, useValue: AuthenticationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should sign user in', ()=>{
    const auth = TestBed.get(AuthenticationService)
    spyOn(auth, 'login').and.returnValue(new Observable<any>())
    component.signIn()
    console.log(this.auth.login())
    expect(auth.login).toHaveBeenCalled()
  })
});
