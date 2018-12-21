import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageService } from './services/messages/message.service';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './services/messages/messages.component';
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
        MatExpansionModule
      } 
        from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PuzzleComponent } from './games/puzzle/puzzle.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Puzzle2Component } from './games/puzzle2/puzzle2.component';
import { GridsterModule } from 'angular-gridster2';
import { SnakeComponent } from './games/snake/snake.component';
import { AskForNameComponent } from './services/highScore/ask-for-name/ask-for-name.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { ScoreBoardComponent } from './games/score-board/score-board.component';
import { IsActiveService } from './services/is-active.service';

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
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // AngularFirestoreDocument, 
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
    GridsterModule
  ],
  providers: [MessageService,IsActiveService],
  entryComponents: [AskForNameComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }