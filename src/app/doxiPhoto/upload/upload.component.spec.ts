import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { UploadService } from '../services/upload.service';
import { MessageService } from 'src/app/games/services/messages/message.service';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let uploadServiceStub={
  getImages() {
    const images = [{id: 1}];
    return of( images );
  },
  getFilters () {
    const filter = [{id: 1}];
    return of( filter );
  },
  uploadSubject: of( {uploaded:1}) 
  
}
let messageServiceStub={
  add(string) {
    // const images = [{id: 1}];
    return string;
  }
}
let file = new File([new ArrayBuffer(2e+5)], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    let fileInput={ files: [file] };
   let fileList = { 0: { name: 'foo', size: 500001 } };
fdescribe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      imports: [MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        FormsModule, 
        MatIconModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule], 
      providers:[
        { provide: UploadService, useValue: uploadServiceStub },
        { provide: MessageService, useValue: messageServiceStub }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * You can fire change event after spyOn:

spyOn(component, 'fileChange');
input.dispatchEvent(new Event('change'));
expect(component.fileChange).toHaveBeenCalled();
   */
  it('should be invalid if not both of the images are selected', ()=>{
    component.uploadForm.controls['original'].setValue({filename:''});
    component.uploadForm.controls['edited'].setValue('');
    component.uploadForm.controls['caption'].setValue('caption');
    console.log(component.uploadForm.valid)
    expect(component.uploadForm.valid).not.toBeTruthy()
  })
});
