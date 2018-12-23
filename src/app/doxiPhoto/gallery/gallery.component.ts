import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ImageService } from '../services/image.service';

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

  constructor(private imgservice: ImageService){}
  ngOnInit() {    
    this.SetNgGallery();

    this.imgservice.getImages()
    this.imagesSubscription=this.imgservice.imagesSubj.subscribe(res=>{
      if(res!=null){
        console.log(res)
        this.images=[]
        for(let i=0; i<res.length; i++){
          if(res[i].caption){
            this.images.push(res[i])
          }
        }
        // this.images=res
      }
    })
  }

  ngOnChanges(){
    this.imgservice.getImages()
    // this.visibleImages = this.imgservice.getImages()
    // this.imgservice.getImages().subscribe(res=>this.images=res)
    // this.images=
  }

  ngOnDestroy(){
    this.imagesSubscription.unsubscribe()
  }



  private SetNgGallery() {
    this.galleryOptions = [
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];
    this.galleryImages = [
      //'./assets/DSC_0627a.jpg', './assets/building-cloud.jpeg', './assets/water-sunlight.jpg'
      {
        small: './assets/DSC_0627a.jpg',
        medium: './assets/DSC_0627a.jpg',
        big: './assets/DSC_0627a.jpg'
      },
      {
        small: './assets/building-cloud.jpeg',
        medium: './assets/building-cloud.jpeg',
        big: './assets/building-cloud.jpeg'
      },
      {
        small: './assets/water-sunlight.jpg',
        medium: './assets/water-sunlight.jpg',
        big: './assets/water-sunlight.jpg'
      },
    ];
  }
}
