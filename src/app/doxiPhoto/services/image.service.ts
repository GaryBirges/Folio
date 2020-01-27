import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
// import { FirebaseApp } from 'angularfire2';
// import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// import 'firebase/storage';
// import { GalleryImage } from '../models/galleryImage.model' 
// import * as firebase from 'firebase'
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // visibleImages=[]
  private uid: string;
  imagesSubj = new BehaviorSubject<any>(null)
  galleryImages

  constructor(private afAuth : AngularFireAuth,) {
                  this.afAuth.authState.subscribe(auth=>{
                    if(auth !== undefined && auth !== null) {
                      this.uid= auth.uid;
                    }
                  })
  }

  // getImages(): Observable<GalleryImage[]>{
  
  getImages(){}
  
  



  
  // getImages(){
  //   if(this.galleryImages){
  //     this.imagesSubj.next(this.galleryImages)
  //   }
  //   return this.db.list('uploads', 
  //   // {
  //   //   query:{
  //   //     orderByChild: 'namelower',
  //   //     // startAt: (ev.target.value),
  //   //     // endAt: (ev.target.value + '\uf8ff')
  //   //   }
  //   //  }
  //   // ).valueChanges()
  //   ).snapshotChanges().pipe(map(changes => {
  //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  //   })).subscribe(fileUploads => {
  //     console.log(fileUploads)
  //     this.galleryImages=fileUploads
  //     this.imagesSubj.next( this.galleryImages);
  //   });

  //   // return this.visibleImages = IMAGES.slice(0);
  // }

/*working version no behaviorsubject*/
  // getImageById(name){
  //   // return IMAGES.slice(0).find(image=>image.id==id)
  //   console.log(name)
  //   return this.db.list(`uploads/${name}`, 
  // )
  // .valueChanges()
  // // .snapshotChanges()
  // /***** */
  // // getImageById(id){
  // //   this.getImages()
  // //   this.imagesSubj.subscribe(res=>{{
  // //     if(res!=null){
  // //       console.log(res)
  // //       for(let i=0; i<this.galleryImages.length; i++){
  // //         if(this.galleryImages[i].key==id){
  // //           console.log("equals")
  // //           console.log(this.galleryImages[i])
  // //           return this.galleryImages[i]
  // //         }
  // //       }
  // //     }
  // //   }})

  //   //  this.galleryImages.slice(0).find(image=>{
  //   //   image.key==id
  //   //   console.log(image)
  //   //   return image
  //   // })
  // // }
  
  // }
}