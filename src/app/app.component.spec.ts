import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; 
import { MessageService } from './games/services/messages/message.service';
import { Component } from '@angular/core';

@Component({selector: 'app-messages', template: ''})
class MessagesStubComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [    RouterTestingModule,  ],
      declarations: [
        AppComponent, MessagesStubComponent
      ],
      // providers: [MessageService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'folio'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('folio');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to folio!');
  // }));
});
