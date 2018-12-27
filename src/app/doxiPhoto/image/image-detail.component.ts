import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit, OnDestroy {

  image:any
  image2:any
  imagesSubscription: any;
  images: any[];
  haveImages
  constructor(private imgservice: ImageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.image= 
    // this.imgservice.getImageById(this.route.snapshot.params['id'])
    // .pipe(map(changes => {
    //    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));console.log(changes)
    // })).subscribe(fileUploads => {
    //   console.log(fileUploads)
    //   this.image = fileUploads;
    this.imagesSubscription=this.imgservice.imagesSubj.subscribe(res=>{
      if(res!=null){
        console.log(res)
        this.images=[]
        for(let i=0; i<res.length; i++){
          if(!res[i].caption){
            this.images.push(res[i])
          }
        }
        // this.image= this.imgservice.getImageById(this.route.snapshot.params['id']).subscribe(res=>{
        //   console.log(res)
        //   this.image.name = res[0];
        //   this.image.url = res[5];
        //   this.image.caption=res[0]
        //   this.image.filter=res[1]
        //   this.image.pairOf=res[3]
        //   this.image.name=res[2]
        //   // this.image2=
        //   for(let i=0; i<this.images.length; i++){
        //     if(this.images[i].pairOf==this.image.pairOf){
        //       this.image2=this.images[i]
        //       console.log(this.image2)
        //       this.haveImages=true;
        //       this.initComparisons()
        //     }
        //   }
        //   })
        
      // }
      }
    })
    
  }
      
    /*** */
  
  ngOnDestroy(){
    this.imagesSubscription.unsubscribe()
  }

  initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      /*once for each "overlay" element:
      pass the "overlay" element as a parameter when executing the compareImages function:*/
      compareImages(x[i]);
    }
    function compareImages(img) {
      var slider, img, clicked = 0, w, h;
      /*get the width and height of the img element*/
      w = img.offsetWidth;
      h = img.offsetHeight;
      /*set the width of the img element to 50%:*/
      img.style.width = (w / 2) + "px";
      /*create slider:*/
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      /*insert slider*/
      img.parentElement.insertBefore(slider, img);
      /*position the slider in the middle:*/
      slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
      /*execute a function when the mouse button is pressed:*/
      slider.addEventListener("mousedown", slideReady);
      /*and another function when the mouse button is released:*/
      window.addEventListener("mouseup", slideFinish);
      /*or touched (for touch screens:*/
      slider.addEventListener("touchstart", slideReady);
       /*and released (for touch screens:*/
      window.addEventListener("touchstop", slideFinish);
      function slideReady(e) {
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*the slider is now clicked and ready to move:*/
        clicked = 1;
        /*execute a function when the slider is moved:*/
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }
      function slideFinish() {
        /*the slider is no longer clicked:*/
        clicked = 0;
      }
      function slideMove(e) {
        var pos;
        /*if the slider is no longer clicked, exit this function:*/
        if (clicked == 0) return false;
        /*get the cursor's x position:*/
        pos = getCursorPos(e)
        /*prevent the slider from being positioned outside the image:*/
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /*execute a function that will resize the overlay image according to the cursor:*/
        slide(pos);
      }
      function getCursorPos(e) {
        var a, x = 0;
        e = e || window.event;
        /*get the x positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x coordinate, relative to the image:*/
        x = e.pageX - a.left;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        /*resize the image:*/
        img.style.width = x + "px";
        /*position the slider:*/
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
    console.log("done")
  }
}
