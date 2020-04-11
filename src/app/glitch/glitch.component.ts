import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// import * as THREE from '../build/three.module.js';

@Component({
  selector: 'app-glitch',
  templateUrl: './glitch.component.html',
  styleUrls: ['./glitch.component.css']
})
export class GlitchComponent implements OnInit {
canvas : HTMLCanvasElement;
ctx:CanvasRenderingContext2D;
WIDTH=800;
HEIGHT=600;
animateID:number;

private audioContext: AudioContext;
private audioBuffer: AudioBuffer;
source: AudioBufferSourceNode;
analyser: AnalyserNode;
bufferLength: number;
dataArray: Uint8Array;

loadingSample=true
inPlay=false

// interval
// bar1Width=0
// bar2Width=0
// bar3Width=0
// bar4Width=0
// bar5Width=0
// bar6Width=0

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Fancy some Noisia?', 300, 40);
    this.audioContext = new AudioContext();
    this.getNoisia().subscribe(res => {
      this.fetchSample(res).then(audioBuffer => {
        this.loadingSample = false;
        this.audioBuffer = audioBuffer;
      })
    })
  }

  fetchSample(url): Promise<AudioBuffer> {
    return fetch(url)
        .then(response => {
          return response.arrayBuffer()
        })
        .then(buffer => {
            return new Promise((resolve, reject) => {
                this.audioContext.decodeAudioData(
                    buffer,
                    resolve,
                    reject
                );
            })
        });
}

playSample() {
  this.playSound(this.audioBuffer)
}
playSound(buffer) {
  this.source = this.audioContext.createBufferSource(); 
  this.source.buffer = buffer;                  
  this.source.connect(this.audioContext.destination);       
  this.source.start(0);    
  this.inPlay=true                     

  this.analyser = this.audioContext.createAnalyser()
  this.analyser.fftSize = 1024; 
  this.source.connect(this.analyser)
  this.analyser.connect(this.audioContext.destination)
  this.bufferLength = this.analyser.frequencyBinCount;

  this.dataArray = new Uint8Array(this.bufferLength);
  this.animateID= requestAnimationFrame(this.draw.bind(this))
  // this.interval=setInterval(()=>{
  //   this.analyser.getByteFrequencyData(this.dataArray)
  //   this.bar1Width=this.dataArray[10]   *2
  //   this.bar2Width=this.dataArray[60]   *2
  //   this.bar3Width=this.dataArray[110]  *2
  //   this.bar4Width=this.dataArray[210]  *2
  //   this.bar5Width=this.dataArray[310]  *2
  //   this.bar6Width=this.dataArray[410]  *2
  // }, 50)
//  this.draw()
}
  pause(){
    this.source.stop();
    // clearInterval(this.interval)
    this.inPlay=false
    setTimeout(() => {
      cancelAnimationFrame(this.animateID)
    }, 1000);
  }
  getNoisia(){
    let noisia = this.storage.ref('music/noisia.mp3')
    return noisia.getDownloadURL()
  }

  draw() {
    this.analyser.getByteFrequencyData(this.dataArray);
    
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    
    var barWidth = (this.WIDTH / this.bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    
    for(var i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i]*4;
      this.ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      this.ctx.fillRect(x,this.HEIGHT-barHeight/2,barWidth,barHeight/2);
      
      x += barWidth + 1;
    }
    this.animateID=requestAnimationFrame(this.draw.bind(this));
  };

}