import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from './message.service';
import {MatCardModule} from '@angular/material/card';


let messageServiceStub={
  add(string) {
    // const images = [{id: 1}];
    return string;
  }
}
describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatCardModule
      ],
      declarations: [ MessagesComponent ],
      providers:[
        { provide: MessageService, useValue: messageServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
