import { Component, OnInit, ViewChild } from '@angular/core';
import { HighScoreService } from '../../services/highScore/high-score.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor( private highScore: HighScoreService) { }
  snakeScore
  puzzleScore
  
  puzzleDisplayedColumns: string[] = ['steps', 'time', 'name', 'difficulty'];
  PuzzleData //= new MatTableDataSource<any>(this.puzzleScore);
  @ViewChild(MatPaginator) paginatorPuzzle: MatPaginator;
  @ViewChild(MatSort) sortPuzzle: MatSort;
  
  ngOnInit() {
    // this.snakeScore=this.highScore.snakeScores
    // this.puzzleScore=this.highScore.puzzleScores
    this.highScore.snakeCollection.valueChanges().subscribe(res=>{
      this.snakeScore=res
      console.log(res)
    })
    this.highScore.puzzleCollection.valueChanges().subscribe(res=>{
      this.puzzleScore=res
      this.PuzzleData = new MatTableDataSource<any>(this.puzzleScore);
      this.PuzzleData.paginator = this.paginatorPuzzle;
      this.PuzzleData.sort = this.sortPuzzle;
    })
    console.log(this.puzzleScore)
  }

}
