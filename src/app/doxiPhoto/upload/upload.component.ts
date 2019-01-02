import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import {Upload } from '../models/upload.model';
// import
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
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
  caption
  filters: any[];

  constructor(private uploadService: UploadService) { }
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ngOnInit() {
    // this.files
    this.getFilters()
    this.filters=[]
  }

  uploadFiles(){
    // const filesToUpload = this.files
    // console.log(this.fileOriginal[0])
    // this.fileOriginal[0].name=
    // console.log(filesToUpload)
    // for(let i=0; i<filesToUpload.length; i++){
      // console.log(filesToUpload[i])
      // console.log(this.caption)
      this.upload = new Upload(this.fileOriginal[0])
      // this.upload.pairOf=(btoa(this.fileOriginal[0].name))
      this.upload.caption=this.caption
      this.upload.filter=this.filters
      console.log(this.upload)
      this.uploadService.uploadFile(this.upload  )
      this.filters.forEach(f => {
        if(this.allFilters.indexOf(f)==-1){
          this.addFilter(f)
        }
      });
      // this.upload2 = new Upload(this.fileEdited[0])
      // this.upload2.pairOf= (btoa(this.fileOriginal[0].name))
      // this.uploadService.uploadFile(this.upload2)

      // this.uploadService.
    // }
  }

  handleFilesOriginal(event){
    console.log(event.target.files)
    this.fileOriginal=event.target.files;
  }
  handleFilesEdited(event){
    this.fileEdited=event.target.files;
  }

  add(event: MatChipInputEvent): void {
    console.log(event)
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      console.log({name: value.trim()})
      let fil={name: value.trim()}
      if(this.filters.indexOf(fil)==-1){
        this.filters.push({name: value.trim()})
      }
      // this.filters.push({name: value.trim()});
      // this.addFilter({name: value.trim()})
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  addFromAll(filter){
    if(this.filters.indexOf(filter)==-1){
      console.log(filter)
      this.filters.push(filter)
    }
  }

  remove(filter): void {
    const index = this.filters.indexOf(filter);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  getFilters(){
    this.uploadService.getFilters().subscribe(res=>{
      console.log(res)
      this.allFilters=res
    })
  }
  addFilter(filter){
    this.uploadService.addFilter(filter)
  }
}
