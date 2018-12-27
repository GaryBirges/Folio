import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  visibleImages: any[]=[]
  images//:Observable<GalleryImage[]>
  @Input() filterBy?: string ='all'
  imagesSubscription: any;

  constructor(private imgservice: ImageService,
              public dialog: MatDialog,
              public auth: AuthenticationService,
              public upload: UploadService){}

  ngOnInit() {    
    this.upload.getImages().subscribe(res=>{
      this.images=res
      this.images.forEach(image => {
        this.galleryImages.push({small:image.url, medium:image.url, big:image.url})
        
      });
    })
    this.SetNgGallery();
  }

  ngOnChanges(){
    // this.images=this.upload.getImages()
    // this.visibleImages = this.imgservice.getImages()
    // this.imgservice.getImages().subscribe(res=>this.images=res)
    // this.images=
  }

  ngOnDestroy(){
    // this.imagesSubscription.unsubscribe()
  }



  private SetNgGallery() {
    this.galleryOptions = [
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];
    this.galleryImages=[]
    
    // this.galleryImages = [
    //   {
    //     small: './assets/DSC_0627a.jpg',
    //     medium: './assets/DSC_0627a.jpg',
    //     big: './assets/DSC_0627a.jpg'
    //   },
    //   {
    //     small: './assets/building-cloud.jpeg',
    //     medium: './assets/building-cloud.jpeg',
    //     big: './assets/building-cloud.jpeg'
    //   },
    //   {
    //     small: './assets/water-sunlight.jpg',
    //     medium: './assets/water-sunlight.jpg',
    //     big: './assets/water-sunlight.jpg'
    //   },
    // ];
  }

  openLogin(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      data: {name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // if(result!==undefined){
      //   this.highScore.setUser(result)
      //   this.highScore.addScoreToBoard('Puzzle', this.getScore())
      // }
      // this.animal = result;
    });
  }
  openUpload(){

  }
}
