import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatButtonModule } from '@angular/material/button';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadService } from '../services/upload.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

let uploadServiceStub={
  getImages() {
    const images = [{caption: "Agriculture",
    filter: ["Field"],
    name: "aerial-agriculture-beautiful-2892013.jpg",
    pairof: "x",
    url: "https://firebasestorage.googleapis.com/v0/b/highscore-aaa5e.app"}]
    console.log(images)
    return of( images );
  },
  getFilters () {
    const filter = [{name: 'city'}, {name:"people"}];
    return of( filter );
  }
}
describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      imports:[MatCardModule, NgxGalleryModule, MatButtonModule,MatDialogModule, BrowserAnimationsModule],
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

  it('should set filters', ()=>{
    expect(component.filters).toEqual([{name: 'city'}, {name:"people"}])
  } )

  it('should not set galleryImages', ()=>{
    expect(component.galleryImages).toEqual([])
  } )
  
  it('should filter out the image from galleryImages', ()=>{
    component.filter('kittens')
    expect(component.galleryImages.length).toEqual(0)
  } )
  it('should set galleryImages', ()=>{
    component.filter('Field')
    expect(component.galleryImages.length).toEqual(1)
  } )


  it('should return an image ', (()=>{
    expect(component.images.length).toEqual(1)
    expect(component.pairs).not.toBeNull()
  } ))

  it('should not return an image pair ', (()=>{
    expect(component.pairs.length).toEqual(0)
  } ))

  xit('should open the dialog with the image', ()=>{
    //needs a mock open or something
    component.filter('Field')
    component.openPreview(0)
    console.log()
  }) 
});
