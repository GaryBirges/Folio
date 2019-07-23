import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageService } from './games/services/messages/message.service';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './games/services/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatGridListModule,
        MatExpansionModule,
        MatChipsModule
      } 
        from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PuzzleComponent } from './games/puzzle/puzzle.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Puzzle2Component } from './games/puzzle2/puzzle2.component';
import { GridsterModule } from 'angular-gridster2';
import { SnakeComponent } from './games/snake/snake.component';
import { AskForNameComponent } from './games/services/highScore/ask-for-name/ask-for-name.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { ScoreBoardComponent } from './games/score-board/score-board.component';
import { IsActiveService } from './games/services/is-active.service';
import { GalleryComponent } from './doxiPhoto/gallery/gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ImageDetailComponent } from './doxiPhoto/image/image-detail.component';
import { LoginComponent } from './doxiPhoto/login/login.component';
import { UploadComponent } from './doxiPhoto/upload/upload.component';
import { ImageService } from './doxiPhoto/services/image.service';
import { ImageFilterPipe } from './doxiPhoto/image/filter.pipe';
import { AuthGuard } from './doxiPhoto/services/authGuard.service';
import { UploadService } from './doxiPhoto/services/upload.service';
import { AuthenticationService } from './doxiPhoto/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompareImageComponent } from './doxiPhoto/compare-image/compare-image.component';
import { PongComponent } from './games/pong/pong.component';
// import { ImageDetailComponent } from './image/image-detail.component';
// import { LoginComponent } from './login/login.component';
// import { UploadComponent } from './upload/upload.component';
// import { ImageService} from './services/image.service'
// import { ImageFilterPipe } from './image/filter.pipe';
// import { AuthGuard } from './services/authGuard.service';
// import { AuthenticationService } from './services/authentication.service';
// import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent,
    PuzzleComponent,
    WelcomeComponent,
    Puzzle2Component,
    SnakeComponent,
    AskForNameComponent,
    ScoreBoardComponent,
    GalleryComponent,
    ImageDetailComponent,
    LoginComponent,
    UploadComponent,
    CompareImageComponent,
    PongComponent,
    ImageFilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // AngularFirestoreDocument, 
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    DragDropModule,
    GridsterModule,
    NgxGalleryModule,
    MatChipsModule,
    // FontAwesomeModule,
    
  ],
  providers: [MessageService,
    ImageFilterPipe,
    IsActiveService,
    ImageService,
    AuthGuard,
    AuthenticationService,
    UploadService,
    AngularFireAuth,
    AngularFireStorage,
  ],
  entryComponents: [AskForNameComponent, CompareImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
