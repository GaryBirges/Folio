import { Injectable } from '@angular/core';
import { Upload } from '../models/upload.model';
import { GalleryImage } from '../models/galleryImage.model';
import { BehaviorSubject, Observable, merge, combineLatest, forkJoin, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';

import * as firebase from 'firebase';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = "/uploads"
  // private uploads: AngularFireList <GalleryImage[]>
  uploadSubject: BehaviorSubject<any>= new BehaviorSubject<any>(null)

  uploadPercent: number=0
  // downloadURL: Observable<string>;
  photoCollection : AngularFirestoreCollection
  photoFilters : AngularFirestoreCollection
  // images: firebase.firestore.DocumentData[];
  filters: firebase.firestore.DocumentData[];


  constructor(//private AngularFire: AngularFireModule, 
              // private db: AngularFireDatabase, 
              db: AngularFirestore,
              private storage: AngularFireStorage
              ) { 
                this.photoCollection=db.collection('DoxiPhoto')
                this.photoFilters=db.collection('DoxiPhotoFilter')
  }

  uploadFile(blobs) {
    this.uploadPercent=0
    const allPercentage: Observable<number>[] = [];
    blobs.map((event)=>{
      const file = event.file;
      const filePath = `${this.basePath}/${event.name}`;// it will overwrite the same name stuff
      console.log(filePath)
      const fileRef = this.storage.ref(filePath);
      const pairOf= event.pairOf?event.pairOf: ''
      const task = this.storage.upload(filePath, file, {customMetadata:{caption: `${event.caption}`, filter:`${event.filter}`}});
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);
      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL() 
          this.getUrl(downloadURL, event.name, event.caption, event.filter, pairOf,)
        })
       )
      .subscribe()
    })
    combineLatest(...allPercentage).subscribe(res=>{
      this.uploadPercent=res.reduce((a, b)=>a+b)/2;
      if(this.uploadPercent==100){
        this.uploadSubject.next("upload done")
        setTimeout(() => {
          this.uploadPercent=0
        }, 2000);
      }
    })
  }

  getUrl(downloadURL, name, caption, filter,pairOf?){
    downloadURL.subscribe(res=>{
      this.saveFileData({name:name, pairof:pairOf, url:res, caption:caption, filter:filter})
    })
  }

  saveFileData({name:name, pairof:pairOf, url:res, caption:caption, filter:filter}){
    this.photoCollection.add({name:name, pairof:pairOf, url:res, filter:filter,caption:caption})
  }
  getImages(){
    return  this.photoCollection.valueChanges()
  }
  getFilters(){
    return this.photoFilters.valueChanges()
  }

  addFilter(filter: any): any {
    this.photoFilters.add(filter)
  }

  async uploadGroup(details){
    let large=await resizeImage({maxSize:1920,file:details.file})
    let medium= await resizeImage({maxSize:600, file:details.file})
    let small = await resizeImage({maxSize:200, file:details.file})
    if(details.pair!=null){
      let pair=await resizeImage({maxSize:1920,file:details.pair})
    }
    console.log(details)
    console.log(large)
    this.uploadFile({file:medium, name:details.file.name, caption:details.caption, filter: details.filters})
  }

}
interface IResizeImageOptions {
  maxSize: number;
  file: File;
}
const resizeImage = (settings: IResizeImageOptions) => {
  const file = settings.file;
  const maxSize = settings.maxSize;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');
  const dataURItoBlob = (dataURI: string) => {
    const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
        atob(dataURI.split(',')[1]) :
        unescape(dataURI.split(',')[1]);
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], {type:mime});
  };
  const resize = () => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    let dataUrl = canvas.toDataURL('image/jpeg');
    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }

      reader.onload = (readerEvent: any) => {
        image.onload = () => ok(resize());
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
  })    
};