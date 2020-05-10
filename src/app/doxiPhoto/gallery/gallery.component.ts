import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { UploadService } from '../services/upload.service';
import { CompareImageComponent } from '../compare-image/compare-image.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  galleryImages= [];

  images
  filters
  pairs

  timer
  criteria: string;
  constructor(
              public dialog: MatDialog,
              public upload: UploadService){
                this.timer=Date.now()
              }

  ngOnInit() {
    this.getImages();
    this.getFilters();
    this.SetNgGallery();
  }

  private getFilters() {
    this.upload.getFilters().subscribe(res => {
      this.filters = res;

    });
  }

  private getImages() {
    this.upload.getImages().subscribe(res => {
      this.images = [];
      this.pairs = [];
      console.log(res);
      res.forEach(x => {
        if (x.pairof == '') {
          this.pairs.push(x);
          // console.log(this.pairs)
        }
        else {
          this.images.push(x);
        }
      });
      this.filter('all');
    });
  }

  ngOnDestroy(){
    // this.imagesSubscription.unsubscribe()
  }



  private SetNgGallery() {
    this.galleryOptions = [
      { "previewCloseOnClick": true, "previewCloseOnEsc": true, "imageArrows": true, previewCustom: this.openPreview.bind(this) },
      {  "width": "100%", "height" : "570px" , "thumbnailsColumns": 3,previewCustom: this.openPreview.bind(this) },
      { "breakpoint": 800, "width": "100%", "height": "400px",  "thumbnailsColumns": 2,"imageSwipe": true, previewCustom: this.openPreview.bind(this) }
    ];
    this.galleryImages=[]
  }
 //"height": "575px"
  openPreview(index){
    const pair=this.pairs.filter(image => {
      if( image.name==this.galleryImages[index].img.pairof){
        return image
      }
    });
    console.log(pair)
    let dialogRef = this.dialog.open(CompareImageComponent, {
      width: '86vw',
      height: 'auto',
      maxWidth:'86%',
      maxHeight:'90%',
      /* // width: '450px',
      maxWidth:'80%',
      maxHeight:'90%',*/
      data: {image: this.galleryImages[index].img, toCompare:pair[0]}, //only one pair should be returned...
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    // this.openLogin()
  }



  imageFilter(items:any[], criteria: string):any {
    if(criteria==='all'){
      return true
    }else{
      return items.some(item=>item===criteria)
    }
  }

  filter(criteria:string){
    this.criteria=criteria
    this.galleryImages=[]

    this.images.forEach(img => {
     if(this.imageFilter(img.filter, criteria)){
       this.galleryImages.push({small:img.url, medium:img.url, big:img.url, img:img})
     }
    });
  }
}

