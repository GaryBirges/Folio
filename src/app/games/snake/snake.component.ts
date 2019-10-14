import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HighScoreService } from '../services/highScore/high-score.service';
import { AskForNameComponent } from '../services/highScore/ask-for-name/ask-for-name.component';
@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  state
  canvas 
  ctx
  score=0
  maxScore: number;
  
 
  constructor(public dialog: MatDialog,
              private highScore: HighScoreService,) { }

  ngOnInit() {
    
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')
    this.state = this.initialState()
    this.draw();  
    window.requestAnimationFrame(this.step(0))
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    switch (event.key) {
      case 'w': case 'h': case 'ArrowUp':    this.state = this.enqueue(this.state, NORTH); break
      case 'a': case 'j': case 'ArrowLeft':  this.state = this.enqueue(this.state, WEST);  break
      case 's': case 'k': case 'ArrowDown':  this.state = this.enqueue(this.state, SOUTH); break
      case 'd': case 'l': case 'ArrowRight': this.state = this.enqueue(this.state, EAST);  break
    }
  }
  swipeLeft(){
    console.log("swipeleft")
    this.state = this.enqueue(this.state, WEST);
  }
  swipeRight(){
    console.log("swipeRight")
    this.state = this.enqueue(this.state, EAST);
  }
  swipeUp(){
    console.log("swipeUp")
    this.state = this.enqueue(this.state, NORTH);
  }
  swipeDown(){
    console.log("swipeDown")
    console.log(this.state)
    this.state = this.enqueue(this.state, SOUTH); 
    console.log(this.state)
  }
 // Position helpers
 x = c => Math.round(c * this.canvas.width / this.state.cols)
 y = r => Math.round(r * this.canvas.height / this.state.rows)

  // Game loop draw
draw() {
  // clear
  this.ctx.fillStyle = '#232323'
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

  // draw snake
  this.ctx.fillStyle = 'rgb(0,200,50)'
  this.state.snake.map(p => this.ctx.fillRect(this.x(p.x), this.y(p.y), this.x(1)-1, this.y(1)-1))

  // draw apples
  this.ctx.fillStyle = 'rgb(255,50,0)'
  this.ctx.fillRect(this.x(this.state.apple.x), this.y(this.state.apple.y), this.x(1), this.y(1))

  // add crash
  if (this.state.snake.length == 0) {
    this.ctx.fillStyle = 'rgb(255,0,0)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  // console.log(this.state)
}

step = t1 => t2 => {
  if (t2 - t1 > 100) {
    this.state = this.next(this.state)
    this.draw()
    window.requestAnimationFrame(this.step(t2))
    if(this.state.snake.length>0){
      this.score=this.state.snake.length
    }else{
      this.highScore.addScore('Snake', this.getScore())
    }
  } else {
    window.requestAnimationFrame(this.step(t1))
  }
}

enqueue (state, move){
 return this.validMove(move)(state)
 ? merge(state)({ moves: state.moves.concat([move]) })
 : state
} 

// Point operations
/**currying */
// pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y
pointEq (p1){
  return (p2) => {
    return p1.x == p2.x && p1.y == p2.y
  }
} 

willEat(state)  {
  // this.score++
  // console.log(this.score)
  return this.pointEq(this.nextHead(state))(state.apple)

}
willCrash(state){
  // console.log(this.score)
  return state.snake.find(this.pointEq(this.nextHead(state)))
}

validMove (move) {
  return (state)=>{
    return state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0
  }
} 

// Next values based on state
 nextMoves (state) {
   return state.moves.length > 1 ? dropFirst(state.moves) : state.moves
 } 
 nextApple = state => this.willEat(state) ? this.rndPos(state) : state.apple
 
 nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
 nextSnake = state => {
    if(this.willCrash(state)){
      this.maxScore=this.score
      console.log(this.maxScore)
      return []
    } else{
      if(this.willEat(state)){
        return [this.nextHead(state)].concat(state.snake)
      }else{
        return [this.nextHead(state)].concat(dropLast(state.snake))
      }
    } 
 }
//  nextSnake = state => this.willCrash(state)
//   ? []
//   : (this.willEat(state)
//     ? [this.nextHead(state)].concat(state.snake)
//     : [this.nextHead(state)].concat(dropLast(state.snake)))


  // rndPos = table => ({
  //   x: rnd(0)(table.cols - 1),
  //   y: rnd(0)(table.rows - 1)
  // })
  rndPos = table =>{
    let p={
      x: rnd(0)(table.cols - 1),
      y: rnd(0)(table.rows - 1)
    }
    let pointInSnake=false
    table.snake.forEach(pos => {
      if(this.pointEq(p)(pos)){
        pointInSnake=true
      }
    });
    return pointInSnake ? this.rndPos(table) : p
  } 
    
  // Initial state
    initialState = () => ({
    cols:  20,
    rows:  15,
    moves: [EAST],
    snake: [],
    apple: { x: 16, y: 2 },
  })
    //work on this one 44:20
    // next= state=>({
    //   rows:state.rows,
    //   cols:state.rows,
    //   moves: this.nextMoves(state),
    //   snake: this.nextSnake(state),
    //   apple: this.nextApple(state)
    // })

    next = spec({
      rows:  prop('rows'),
      cols:  prop('cols'),
      moves: this.nextMoves,
      snake: this.nextSnake,
      apple: this.nextApple
    })

    getScore(): any {
      return {score:this.maxScore}
    }
}

const adjust    = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)
const dropFirst = xs => xs.slice(1)
const dropLast  = xs => xs.slice(0, xs.length - 1)
const id        = x => x
const k         = x => y => x
const map       = f => xs => xs.map(f)
const mapi      = f => xs => xs.map((x, i) => f(x)(i))
const merge     = o1 => o2 => Object.assign({}, o1, o2)
const mod       = x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7
const objOf     = k => v => { var o = {}; o[k] = v; return o }
const pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
const prop      = k => o => o[k]
const range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i)
const rep       = c => n => map(k(c))(range(0)(n))
const rnd       = min => max => Math.floor(Math.random() * max) + min
const spec      = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o))

const NORTH = { x: 0, y:-1 }
const SOUTH = { x: 0, y: 1 }
const EAST  = { x: 1, y: 0 }
const WEST  = { x:-1, y: 0 }
