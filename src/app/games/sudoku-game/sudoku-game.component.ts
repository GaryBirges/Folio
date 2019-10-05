import { Component, OnInit } from '@angular/core';
import * as generator from 'sudoku'
@Component({
  selector: 'app-sudoku-game',
  templateUrl: './sudoku-game.component.html',
  styleUrls: ['./sudoku-game.component.css']
})
export class SudokuGameComponent implements OnInit {

  sudoku
  generator
  timer
  interval
  constructor(){
  }
  
  ngOnInit(){
    this.sudoku = this.generateSudoku()
    this.timeElapsed()
  }

 /* 
  generates a sudoku with structure :
  {rows:[{index: 0, cols:[{row: 0, col:0 value: 1 readOnly:true}, ...]}, ...]}
 */
  generateSudoku(){
    const raw = generator.makepuzzle()
    const rawSolution = generator.solvepuzzle(raw)
    const formatted = raw.map(e=>e != null ? e+1 : null)
    const formattedSolution = rawSolution.map(e => e+1)

    const result = {
      rows:[], 
      solution: formattedSolution,
      startTime: new Date(),
      solveTime: null
    }

    for(let i=0; i<9; i++){
      const row = {cols:[], index: i}
      for (let j=0; j<9; j++){
        const value = formatted[i*9+j]
        const col ={
          row: i,
          col: j,
          value: value,
          readonly: value!==null
        }
        row.cols.push(col)
      }
      result.rows.push(row)
    }

    return result
  }

  checkSolution(sudoku){
    const candidate = sudoku.rows.map((row=>row.cols.map((col) => col.value))).flat()

    for(let i=0; i<candidate.length; i++){
      if( candidate[i]===null ||candidate[i]!==sudoku.solution[i]){
        return false
      }
    }
    return true
  }

  solveSudoku(){
    this.sudoku.rows.forEach(row => 
      row.cols.forEach(col=>{
          col.value = this.sudoku.solution[col.row*9+col.col]
      })
    );
  }


  timeElapsed(){
    this.interval = setInterval(()=>{
     this.timer= Math.floor((new Date().getTime() -this.sudoku.startTime.getTime())/1000)
    })
  }

  change(field, event){
    const value = event.target.value === "" ? null : parseInt(event.target.value)
    this.sudoku.rows[field.row].cols[field.col].value=value
    if(!this.sudoku.solveTime){
      const solved= this.checkSolution(this.sudoku)
      if(solved){
        clearInterval(this.interval)
        this.sudoku.solveTime = new Date()
      }
    }
  }

   validateKeyPress(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event['clipboardData'].getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
