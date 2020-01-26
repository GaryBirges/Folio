import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatButtonModule } from '@angular/material/button';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadService } from '../services/upload.service';
import { of } from 'rxjs';


export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

let uploadServiceStub={
  getImages() {
    const images = [{id: 1}];
    return of( images );
  },
  getFilters () {
    const filter = [{id: 1}];
    return of( filter );
  }
}
describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      imports:[MatCardModule, NgxGalleryModule, MatButtonModule,MatDialogModule],
      providers: [
        MatDialog,
        { provide: UploadService, useValue: uploadServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {image:{url:''},toCompare:{url:''}}} ,
        { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
