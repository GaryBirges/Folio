import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import {Upload } from '../models/upload.model';
// import
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileOriginal:FileList;
  fileEdited:FileList;
  upload: Upload;
  upload2: Upload;
  allFilters
  removable = true;
  addOnBlur = true;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  uploadForm
  thumbnailUrl: any='';
  thumbnailEditedUrl: any='';
  thumbnailReady=false
  thumbnailEditedReady=false
  
  constructor(private uploadService: UploadService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.CreateUploadForm()
    this.getFilters()
    this.uploadService.uploadPercent.subscribe(res=>{
      console.log(res)
    })
  }
  CreateUploadForm(): any {
   this.uploadForm= this.fb.group({
     original:    '',
     edited:      '',
     caption:     '',
     filters:     this.fb.control([])
   })
  }

  uploadFiles(){
    let a= resizeImage({maxSize:1920,file:this.fileOriginal[0]}).then(resizedImage=>{
      console.log(resizedImage)
      console.log(this.fileOriginal[0])
      // this.upload = new Upload(this.fileOriginal[0])
      // this.upload.pairOf=(btoa(this.fileOriginal[0].name))
      // this.upload.caption=this.uploadForm.value.caption
      // this.upload.filter=this.uploadForm.value.filters
      console.log(this.upload)
      let blob={file:resizedImage, 
        caption:this.uploadForm.value.caption, 
        name:'attractive', 
        filter:this.uploadForm.value.filters
      }
      // blob.file=
      this.uploadService.uploadFile(blob)
      this.uploadForm.value.filters.forEach(f => {
        let existingFilter = false;
        for (let i = 0; i < this.allFilters.length; i++) {
          if (this.allFilters[i].name == f.trim()) {
            existingFilter = true;
          }
        }
        if (!existingFilter) {
          this.addFilter({name:f})
        }
      });
    })

      // if(this.fileEdited[0]!==null){
      //   this.upload2 = new Upload(this.fileEdited[0])
      //   this.upload2.pairOf= (btoa(this.fileOriginal[0].name))
      //   this.upload2.filter=this.uploadForm.value.filters
      //   this.upload2.caption=this.uploadForm.value.caption
      //   this.uploadService.uploadFile(this.upload2)
      // }
  }

  handleFilesOriginal(event){
    console.log(event.target.files)
    this.fileOriginal=event.target.files;
    let reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.thumbnailUrl = event.target['result'];
        this.thumbnailReady=true
      }
    }
  }
  handleFilesEdited(event){
    this.fileEdited=event.target.files;
    let reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.thumbnailEditedUrl = event.target['result'];
        this.thumbnailEditedReady=true
      }
    }
  }

  add(event: MatChipInputEvent): void {
    console.log(event)
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.AddIfNotExisting(value);
    }

    if (input) {
      input.value = '';
    }
  }
  private AddIfNotExisting(value: string) {
    let existingFilter = false;
    const allFilters = this.uploadForm.get('filters').value ;
    for (let i = 0; i < allFilters.length; i++) {
      if (allFilters[i] == value.trim()) {
        existingFilter = true;
      }
    }
    if (!existingFilter) {
      allFilters.push((value.trim() ));
    }
  }

  addFromAll(filter){
    this.AddIfNotExisting(filter.name)
  }

  remove(filter): void {
    const allFilters = this.uploadForm.get('filters').value ;
    const index = allFilters.indexOf(filter);

    if (index >= 0) {
      allFilters.splice(index, 1);
    }
  }

  getFilters(){
    this.uploadService.getFilters().subscribe(res=>{
      this.allFilters=[]
      res.forEach(f=>{if(f.name!=='all'){this.allFilters.push(f)}})
    })
  }
  addFilter(filter){
    this.uploadService.addFilter(filter)
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