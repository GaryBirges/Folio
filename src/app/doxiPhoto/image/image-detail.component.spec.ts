import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailComponent } from './image-detail.component';
import { ImageService } from '../services/image.service';
import { observable, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
let imageServiceStub= {
  imagesSubj:of([1,2,3])
}
describe('ImageDetailComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers:[ { provide: ImageService, useValue: imageServiceStub },{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {image:{url:''},toCompare:{url:''}} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
