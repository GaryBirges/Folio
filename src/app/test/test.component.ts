import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }
  onDisplay=''
  list=["bat", "ball", "basket"]
  counter=0
  allLetters
  extension=''
  ngOnInit() {
    this.allLetters=this.getAllLetters()
  }
  start(){
    this.addLetter(this.list[this.counter])
    this.counter++;
  }
  found
  addLetter(word){
    let a= word.split('')
    let b = a.shift()
    // console.log(b)
    // this.found=false
    console.log(word.length)
    // if(word.length>1){
      console.log(b)
      this.searchForLetter(b,0, a);
    this.onDisplay=this.onDisplay+b
    // }else{
    //   this.removeLetter(word)
    // }
  
  }
  removeLetter(word){
    this.onDisplay=this.onDisplay.substring(0, this.onDisplay.length-1)
    setTimeout(() => {
      if(this.onDisplay.length){
        this.removeLetter(this.onDisplay)
      }else{
        if(this.list[this.counter]){
          this.addLetter(this.list[this.counter])
          this.counter++
        }
      }
    }, 300);
  }

  searchForLetter(letter, i, a){
    ++i
    setTimeout(() => {
      if(i<this.allLetters.length){
        if(this.extension!=letter&&a.length){ 
          // console.log("called")
          this.extension=this.allLetters[i]
          this.searchForLetter(letter, i, a)
        }else{
          // console.log("not") 
          // console.log(letter)
          this.found=true
          let together =a.join('')
            // setTimeout(() => {
              together.length ? this.addLetter(together) : setTimeout(() => {this.removeLetter(together) }, 1000); 
          // },1000);
          this.extension=''
        }
      }
    }, 30);
  }
  getAllLetters(){
    let s = [];
    for( var i = 32; i <= 126; i++ )
    {
        s.push( String.fromCharCode( i ))
    }
    return s
  }
}
