import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import {Upload } from '../models/upload.model';
// import
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
  filter
  caption

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    // this.files
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
      this.upload.filter=this.filter
      console.log(this.upload)
      this.uploadService.uploadFile(this.upload  )
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
}
