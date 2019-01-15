import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-compare-image',
  templateUrl: './compare-image.component.html',
  styleUrls: ['./compare-image.component.css']
})
export class CompareImageComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CompareImageComponent>,
                @Inject(MAT_DIALOG_DATA) public data:{index:number}) { }

  ngOnInit() {
    console.log(this.data.index)
  }

}
