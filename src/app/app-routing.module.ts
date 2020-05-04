import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PuzzleComponent } from './games/puzzle/puzzle.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Puzzle2Component } from './games/puzzle2/puzzle2.component';
import { SnakeComponent } from './games/snake/snake.component';
import { ScoreBoardComponent } from './games/score-board/score-board.component';
import { GalleryComponent } from './doxiPhoto/gallery/gallery.component';
import { UploadComponent } from './doxiPhoto/upload/upload.component';
import { LoginComponent } from './doxiPhoto/login/login.component';
import { PongComponent } from './games/pong/pong.component';
import { SudokuGameComponent } from './games/sudoku-game/sudoku-game.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { GlitchComponent } from './glitch/glitch.component';
import { TestComponent } from './test/test.component';
import { JobScraperComponent } from './job-scraper/job-scraper.component';


const routes: Routes = [
  // { path: '', redirectTo: 'loginBroker', pathMatch: 'full' },  //change it from login
  { path: '', component: HomeComponent,

  //   canActivate:[AuthGuard],
  //   canDeactivate:[CanDeactivateGuard],
  //   canActivateChild:[AuthGuard],
    children: [
          {path: '', component: WelcomeComponent,  pathMatch: 'full' },
          {path : 'puzzle', component: PuzzleComponent},
          {path : 'puzzle2', component: Puzzle2Component},
          {path : 'snake', component: SnakeComponent},
          {path : 'pong', component: PongComponent},
          {path : 'sudoku', component: SudokuGameComponent},
          {path : 'tetris', component: TetrisComponent},
          {path : 'scoreboard', component: ScoreBoardComponent},
          {path : 'gallery', component: GalleryComponent},
          {path: 'upload', component: UploadComponent,},// canActivate: [AuthGuard]},
          {path: 'login', component: LoginComponent},
          {path: 'upload', component: UploadComponent},
          {path: 'glitch', component: GlitchComponent},
          {path: 'test', component: TestComponent},
          {path: 'jobsearch', component: JobScraperComponent},
  ] },
  {path: '**',redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
