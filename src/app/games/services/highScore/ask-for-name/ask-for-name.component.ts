import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-for-name',
  templateUrl: './ask-for-name.component.html',
  styleUrls: ['./ask-for-name.component.css']
})
export class AskForNameComponent {

  constructor(    public dialogRef: MatDialogRef<AskForNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { console.log(data) }

    onNoClick(): void {
      this.dialogRef.close();
    }
    objectKeys = Object.keys;
}
interface DialogData {
  name: string;
  score:Object;
}