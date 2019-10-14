import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HighScoreService } from '../services/highScore/high-score.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  
  constructor( private highScore: HighScoreService) { }
  
  puzzleScore
  puzzleData
  puzzleDisplayedColumns: string[] = ['steps', 'time', 'name', 'difficulty'];
  @ViewChild('puzzlePaginator', { static: true }) paginatorPuzzle: MatPaginator;
  @ViewChild('puzzleSort', { static: true }) sortPuzzle: MatSort;
  
  snakeScore
  snakeData: any;
  snakeDisplayedColumns: string[] = ['score', 'name'];
  @ViewChild('snakePaginator', { static: true }) paginatorSnake: MatPaginator;
  @ViewChild('snakeSort', { static: true }) sortSnake: MatSort;

  pongScore
  pongData: any;
  pongDisplayedColumns: string[] = ['score', 'name'];
  @ViewChild('pongPaginator', { static: true }) paginatorPong: MatPaginator;
  @ViewChild('pongSort', { static: true }) sortPong: MatSort;
  
  ngOnInit() {
    this.highScore.snakeCollection.valueChanges().subscribe(res=>{
      this.snakeScore=res
      this.snakeData = new MatTableDataSource<any>(this.snakeScore);
      this.snakeData.paginator = this.paginatorSnake;
      this.snakeData.sort = this.sortSnake;
      console.log(res)
    })
    this.highScore.puzzleCollection.valueChanges().subscribe(res=>{
      this.puzzleScore=res
      this.puzzleData = new MatTableDataSource<any>(this.puzzleScore);
      this.puzzleData.paginator = this.paginatorPuzzle;
      this.puzzleData.sort = this.sortPuzzle;
    })
    this.highScore.pongCollection.valueChanges().subscribe(res=>{
      this.pongScore=res
      this.pongData = new MatTableDataSource<any>(this.pongScore);
      this.pongData.paginator = this.paginatorPong;
      this.pongData.sort = this.sortPong;
    })
  }

}
