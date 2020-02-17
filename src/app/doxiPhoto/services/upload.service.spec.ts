import { TestBed, inject } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable, from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

// const AngularFirestoreStub = {
//   // I just mocked the function you need, if there are more, you can add them here.
//   collection: (someString) => {
//       // return mocked collection here
//       return [{image:'a', name:'b'}]
//   }
// };
const data = of(['test1', 'test2']);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

const FirebaseStorageMock ={

  ref(path: string) {
    console.log("test")
      return {
        getDownloadURL() {
          return of(path)
        }
      }
  },
  upload(){
    return {percentageChanges() {return of('')}, 
      snapshotChanges() {return of('')}} 
  }
}
const blobOrig={file:'file1', 
  caption:'caption1', 
  name:'name1', 
  filter:['filter1']
}
const blobEdited={file:'file2', 
caption:'caption2', 
name:'name2', 
filter:['filter2'],
pairOf:'name1'
}

describe('UploadService', () => {
  let service: UploadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadService, 
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireStorage, useValue: FirebaseStorageMock },
      ]
    });
    service = TestBed.get(UploadService)
  });

  it('should be created', inject([UploadService], (service: UploadService) => {
    expect(service).toBeTruthy();
  }));

  it('should call geturl 2 times for each image', ()=>{
    spyOn(service, 'saveFileData') // I dont want to add to collection
    spyOn(service, 'getUrl')
    service.uploadFile([blobOrig, blobEdited])

    expect(service.getUrl).toHaveBeenCalledTimes(2) 
  })

  // it('should call savefiledata', ()=>{
  //   // service.photoCollection
  //   //downloadURL, name, caption, filter,pairOf?
  //   service.getUrl(()=> of('url'),blobOrig.name,blobOrig.caption,blobOrig.filter)
  //   spyOn(service, 'saveFileData')
  //   expect(service.saveFileData).toHaveBeenCalled()
  //   // expect(service.photoCollection.)
  // })

  it('should return images', ()=>{
    spyOn(service, 'getImages').and.callThrough()
    service.getImages().subscribe(res=>{
      expect(res.length).toBe(2)
    })
  })
});
