import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IsActiveService } from '../games/services/is-active.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const iasMock = {
  isAtiveChange: of( {active:true}) 
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        RouterTestingModule,
        BrowserAnimationsModule 
      ],
      declarations: [ HomeComponent ],
      providers:[
        { provide: IsActiveService, useValue: iasMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
