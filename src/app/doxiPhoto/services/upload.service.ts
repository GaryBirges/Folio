import { Injectable } from '@angular/core';
import { Upload } from '../models/upload.model';
import { GalleryImage } from '../models/galleryImage.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import * as firebase from 'firebase';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = "/uploads"
  // private uploads: AngularFireList <GalleryImage[]>
  uploadSubject: BehaviorSubject<any>= new BehaviorSubject<any>(null)

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  photoCollection : AngularFirestoreCollection

  constructor(//private AngularFire: AngularFireModule, 
              // private db: AngularFireDatabase, 
              db: AngularFirestore,
              private storage: AngularFireStorage
              ) { 
                this.photoCollection=db.collection('DoxiPhoto')
    // this.uploadSubject.next(null)
    // this.uploadSubject.subscribe((upload)=>{
    //   if(upload!=null){
    //     this.saveFileData(upload)
    //   }
    // })
  }

  uploadFile(event) {
    console.log(event)
    const file = event.file;
    const filePath = `${this.basePath}/${file.name}`;// it will overwrite the same name stuff
    console.log(filePath)
    const fileRef = this.storage.ref(filePath);
    const pairOf= ''
    const task = this.storage.upload(filePath, file, {customMetadata:{caption: `${event.caption}`, filter:`${event.filter}`}});

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL() 
          this.getUrl(file.name, pairOf,)
        })
     )
    .subscribe()
  }

  getUrl(name ,pairOf?){
    this.downloadURL.subscribe(res=>{
      console.log(res)
      this.saveFileData({name:name, pairof:pairOf, url:res})
    })
  }

  saveFileData({name:name, pairof:pairOf, url:res}){
    this.photoCollection.add({name:name, pairof:pairOf, url:res})
  }














// /**VERSION % STUFF */
//   uploadFile(upload: Upload){
//     const storageRef = firebase.storage().ref();
//     // const databaseRef = firebase.database().ref(`${this.basePath}/${upload.file.name}`)
//     // const meatdata={
//     //   caption:"image blablabla";
//     //   filter:"house"
//     // }
//     const uploadTask= storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file)
//     upload.caption="blablabla"
//     upload.filter="house"
//     // .then(function(snapshot) {
//     //   console.log('Uploaded a blob or file!');
//     // });
//     let a =uploadTask.on('state_changed', function(snapshot){
//       upload.progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
//       // console.log('Upload is ' + progress + '% done');
//       switch (snapshot['state']) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           // console.log('Upload is paused');
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           // console.log('Upload is running');
//           break;
//       }
//     }, function(error) {
//       // Handle unsuccessful uploads
//       switch (error['code']) {
//         case 'storage/unauthorized':
//           // User doesn't have permission to access the object
//           console.log("unauthorized")
//           break;
    
//         case 'storage/canceled':
//           // User canceled the upload
//           console.log("cancelled")
//           break;
    
    
//         case 'storage/unknown':
//         console.log("uknown error")
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//       }
//     }, function() {
//       // Handle successful uploads on complete
//       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//         console.log('File available at', downloadURL);
//         upload.url=downloadURL 
//         upload.name= upload.file.name;
//         // upload.caption="blablabla"
//         // upload.filter="house"
//         console.log(upload)
        
//         // this.db.list(`${this.basePath}/`).push(upload)
//         // this.uploadSubject.next(upload)
//         // return upload
//       })
//      firebase.database().ref(`/uploads/${upload.file.name}`).set(upload)
//     })
//   //  storageRef.getDownloadURL().then(url=>{ 

//   //    upload.url=url 
//   //    upload.name= upload.file.name;
//   //    this.saveFileData(upload)
//   //   })
//   }
  
//    saveFileData(upload: Upload){{
//     this.db.list(`${this.basePath}/`).push(upload)
//   }}
//   /*working solution 1*/
//   uploadFile(upload: Upload){
//     const storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`${this.basePath}/${btoa(upload.file.name)}`)
//           .put(upload.file)

//     uploadTask.on('state_changed',
//       //statechange observer
//       (snapshot)=> {
//         upload.progress = Number(((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes ) * 100).toPrecision(3))
//         console.log(upload.progress)
//       },
//       //error observer
//       (error)=>{console.log(error)},
//       //success observer
//       ()=>{
//         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//           upload.url=downloadURL
//           upload.name = upload.file.name;
//           // upload.caption="ez a megjegyzes"
//           // upload.pairOf=pairof
//         });
//         // upload.url= uploadTask.snapshot.downloadURL;
//         console.log(upload)
//         setTimeout(() => {
          
//           this.saveFileData(upload);
//         }, 1000);
//       }
//     )
//   }

//   private saveFileData(upload: Upload){
//     this.db.list(`${this.basePath}/`).push(upload);
//     // console.log("File saved!: " + upload.url)  // dont know the upload.url, uploadTask.snapshot.downloadURL deprecated check this: https://firebase.google.com/docs/storage/android/upload-files#get_a_download_url
//   }
}
