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
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import {Location} from "@angular/common";


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
let returnMock = {
  then: jasmine.createSpy(),
};
let user={name:'bill', age:'5'}
let AuthenticationServiceStub={
  login (){return Promise.resolve( {email:'email', pw:'pw'}).then(()=>{console.log("then")})}

}

@Component({template:''})
export class DummyComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let button: HTMLButtonElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, DummyComponent ],
      imports:[
        FormsModule, 
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {path: 'upload', component: DummyComponent}
        ])
      ],
      providers:[
        { provide: MatDialog, useValue: MatDialogMock },
        // { provide: Router, useValue: router },
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
    button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn when user clicks signin button', ()=>{
    spyOn(component, 'signIn')
    button.click()
    fixture.detectChanges()
    fixture.whenStable().then(()=>{
      expect(component.signIn).toHaveBeenCalled()
    })
  })

  // xit('should navigate to the uploads page', (done: DoneFn)=>{
  //   const location = TestBed.get(Location)
  //   // button.click()
  //   console.log(AuthenticationServiceStub)
  //   // spyOn(AuthenticationServiceStub, 'login')/*.and.returnValue(Promise.resolve([]))*/.and.callThrough()
  //   component.signIn()
  //   AuthenticationServiceStub.login().then(()=>{
  //     done()
  //     fixture.detectChanges()
  //     console.log("inside stub")
  //     fixture.whenStable().then(()=>{
  //       console.log("inside fixture change")
  //       expect(location.path()).toBe('/uploads')
  //     })
  //   })
  // })
});
