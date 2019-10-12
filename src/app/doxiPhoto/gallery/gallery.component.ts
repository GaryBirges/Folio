import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { UploadService } from '../services/upload.service';
import { CompareImageComponent } from '../compare-image/compare-image.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  // visibleImages: any[]=[]
  images//:Observable<GalleryImage[]>
  // @Input() filterBy?: string ='all'
  // imagesSubscription: any;
  filters
  pairs

  timer
  constructor(private imgservice: ImageService,
              public dialog: MatDialog,
              // private auth: AuthenticationService,
              public upload: UploadService){
                this.timer=Date.now()
              }

  ngOnInit() {    
    this.upload.getImages().subscribe(res=>{
      console.log(res)
      this.images=[]
      res.forEach(x=>{
          if(x.pairOf==undefined){
            console.log(x.pairOf)
            this.images.push(x)
          }else{
            this.pairs.push(x)
          }
      })
      console.log(Date.now()-this.timer)
      // this.images=res
      console.log(this.images)
      this.filter('all')
    })
    this.upload.getFilters().subscribe(res=>{
      this.filters=res
    })
    this.SetNgGallery();
    setTimeout(() => {
      
      this.initComparisons()
    }, 1000);
  }

  ngOnChanges(){
    // this.images=this.upload.getImages()
    // this.visibleImages = this.imgservice.getImages()
    // this.imgservice.getImages().subscribe(res=>this.images=res)
    // this.images=

  }
  // this.ias.isActive

  ngOnDestroy(){
    // this.imagesSubscription.unsubscribe()
  }



  private SetNgGallery() {
    this.galleryOptions = [
      // {"image":false},
      // {"imageArrows" :true,},
      { "previewCloseOnClick": true, "previewCloseOnEsc": true, "imageArrows": true, previewCustom: this.openPreview.bind(this) },
      {  "width": "600px", "height": "600px", "thumbnailsColumns": 3,previewCustom: this.openPreview.bind(this) },
      { "breakpoint": 800, "width": "100%", "height": "200px", "thumbnailsColumns": 2,previewCustom: this.openPreview.bind(this) }
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

  openPreview(index){
    // console.log("open")
    // console.log(index)
    // console.log(this.images[index])
    let imageName= btoa(this.images[index].name)
    // console.log(imageName)
    // console.log(this.pairs)
    // this.pairs.forEach(img => {
      
    // });
    let dialogRef = this.dialog.open(CompareImageComponent, {
      width: '450px',
      data: {image: this.images[index], toCompare:this.images[index+1]}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    // this.openLogin()
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

  imageFilter(items:any[], criteria: string):any {
    if(criteria==='all'){
      // console.log(items)
        return items;
    }else{
      /*be brave and filter filters with filter in filters*/
      //return items.filter(item=>{return item['filter'].filter(item=>{return item.filter===criteria;})})
        return items.filter(item=>{return item===criteria;})
    }
  }

  filter(criteria:string){
    // console.log(criteria)
    this.galleryImages=[]
    // this.imageFilter(this.images, criteria)
    // .forEach(image => {
    //   this.galleryImages.push({small:image.url, medium:image.url, big:image.url})
    // });

    this.images.forEach(img => {
      this.imageFilter(img.filter, criteria).forEach(image => {
        // console.log(image)
        this.galleryImages.push({small:img.url, medium:img.url, big:img.url})
        // console.log("added")
        // change image property to false
      });
      
    });
    console.log(this.galleryImages)
    console.log(this.galleryOptions)
  }


  /**************************************** */

  initComparisons() {
    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      /* Once for each "overlay" element:
      pass the "overlay" element as a parameter when executing the compareImages function: */
      console.log("compare started")
      compareImages(x[i]);
    }
    function compareImages(img) {
      var slider, img, clicked = 0, w, h;
      /* Get the width and height of the img element */
      w = img.offsetWidth;
      h = img.offsetHeight;
      /* Set the width of the img element to 50%: */
      img.style.width = (w / 2) + "px";
      /* Create slider: */
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      /* Insert slider */
      img.parentElement.insertBefore(slider, img);
      /* Position the slider in the middle: */
      slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
      /* Execute a function when the mouse button is pressed: */
      slider.addEventListener("mousedown", slideReady);
      /* And another function when the mouse button is released: */
      window.addEventListener("mouseup", slideFinish);
      /* Or touched (for touch screens: */
      slider.addEventListener("touchstart", slideReady);
       /* And released (for touch screens: */
      window.addEventListener("touchstop", slideFinish);
      function slideReady(e) {
        /* Prevent any other actions that may occur when moving over the image: */
        e.preventDefault();
        /* The slider is now clicked and ready to move: */
        clicked = 1;
        /* Execute a function when the slider is moved: */
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }
      function slideFinish() {
        /* The slider is no longer clicked: */
        clicked = 0;
      }
      function slideMove(e) {
        var pos;
        /* If the slider is no longer clicked, exit this function: */
        if (clicked == 0) return false;
        /* Get the cursor's x position: */
        pos = getCursorPos(e)
        /* Prevent the slider from being positioned outside the image: */
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /* Execute a function that will resize the overlay image according to the cursor: */
        slide(pos);
      }
      function getCursorPos(e) {
        var a, x = 0;
        e = e || window.event;
        /* Get the x positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x coordinate, relative to the image: */
        x = e.pageX - a.left;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        /* Resize the image: */
        img.style.width = x + "px";
        /* Position the slider: */
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  }
}

