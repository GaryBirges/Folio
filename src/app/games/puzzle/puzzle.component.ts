import { Component, OnInit } from '@angular/core';
import { Observable, timer  } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {  GridsterConfig, GridsterItem, CompactType, DisplayGrid, GridsterComponentInterface, GridsterItemComponentInterface,
  GridType } from 'angular-gridster2';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor() { }
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;



  imageUrl: string = '../assets/DSC_0627a.jpg';
  imageSize: number = 500;
  gridsize: number = 10;
  boxSize: number = 100 / (this.gridsize - 1);
  index: number = 0;
  totalBoxes: number = this.gridsize * this.gridsize;
  Image: any[] = [];
  imageName: string = this.imageUrl.substr(this.imageUrl.lastIndexOf('/') + 1).split('.')[0];
  difficulty: string = '2';
  steps: number = 0;
  ticks: string = '0:00';
  timer: any = timer(0, 1000);
  timeVar: any;
  gameComplete: Boolean = false;

  indexes: number[] = [];
  position: number[] = [];

  ngOnInit() {
    this.startGame();
    this.options = {
      minCols: 4,
      maxCols: 4,
      minRows: 4,
      maxRows: 4,
      /*
       gridType?: gridTypes;
    fixedColWidth?: number;
    fixedRowHeight?: number;
    keepFixedHeightInMobile?: boolean;
    keepFixedWidthInMobile?: boolean;
    setGridSize?: boolean;
    compactType?: compactTypes;
    mobileBreakpoint?: number;
    minCols?: number;
    maxCols?: number;
    minRows?: number;
    maxRows?: number;
    defaultItemCols?: number;
    defaultItemRows?: number;
    maxItemCols?: number;
    maxItemRows?: number;
    minItemCols?: number;
    minItemRows?: number;
    minItemArea?: number;
    maxItemArea?: number;
    margin?: number;
    outerMargin?: boolean;
    outerMarginTop?: number | null;
    outerMarginRight?: number | null;
    outerMarginBottom?: number | null;
    outerMarginLeft?: number | null;
    useTransformPositioning?: boolean;
    scrollSensitivity?: number | null;
    scrollSpeed?: number;
    initCallback?: (gridster: GridsterComponentInterface) => void;
    destroyCallback?: (gridster: GridsterComponentInterface) => void;
    gridSizeChangedCallback?: (gridster: GridsterComponentInterface) => void;
    itemChangeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    itemResizeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    itemInitCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    itemRemovedCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    itemValidateCallback?: (item: GridsterItem) => boolean;
    draggable?: Draggable;
    resizable?: Resizable;
    swap?: boolean;
    pushItems?: boolean;
    disablePushOnDrag?: boolean;
    disablePushOnResize?: boolean;
    disableAutoPositionOnConflict?: boolean;
    pushDirections?: PushDirections;
    pushResizeItems?: boolean;
    displayGrid?: displayGrids;
    disableWindowResize?: boolean;
    disableWarnings?: boolean;
    scrollToNewItems?: boolean;
    enableEmptyCellClick?: boolean;
    enableEmptyCellContextMenu?: boolean;
    enableEmptyCellDrop?: boolean;
    enableEmptyCellDrag?: boolean;
    emptyCellClickCallback?: (event: MouseEvent, item: GridsterItem) => void;
    emptyCellContextMenuCallback?: (event: MouseEvent, item: GridsterItem) => void;
    emptyCellDropCallback?: (event: MouseEvent, item: GridsterItem) => void;
    emptyCellDragCallback?: (event: MouseEvent, item: GridsterItem) => void;
    emptyCellDragMaxCols?: number;
    emptyCellDragMaxRows?: number;
    ignoreMarginInRow?: boolean;
    api?: {
        resize?: () => void;
        optionsChanged?: () => void;
        getNextPossiblePosition?: (newItem: GridsterItem) => boolean;
        getFirstPossiblePosition?: (item: GridsterItem) => GridsterItem;
        getLastPossiblePosition?: (item: GridsterItem) => GridsterItem;
    };
    [propName: string]: any;
      */
      itemChangeCallback: PuzzleComponent.itemChange,
      itemResizeCallback: PuzzleComponent.itemResize,
      Resizable:false
    };

    this.dashboard = [
      // {cols: 2, rows: 2, y: 0, x: 0, hasTitle: true, dragEnabled: true, chart: "line", title: "Yearly Profit", id: "YearlyProfit", image: this.Image[1] },
      // {cols: 2, rows: 2, y: 0, x: 2, hasTitle: true, dragEnabled: true, chart: "line", title: "Yearly Profit", id: "YearlyProfit",image: this.Image[0] },
      // {cols: 2, rows: 2, y: 0, x: 0, hasTitle: true, dragEnabled: true, chart: "line", title: "Yearly Profit", id: "YearlyProfit", image: this.Image[2] },
      // {cols: 2, rows: 2, y: 0, x: 2, hasTitle: true, dragEnabled: true, chart: "line", title: "Yearly Profit", id: "YearlyProfit",image: this.Image[3] }
    ];
    console.log(
      this.dashboard  
    )
    let numberOfRows=2
    let numberOfCols=2
    let pieceNo=0
    for(let i=0;i<numberOfRows; i++){
      for(let j=0;j<numberOfCols; j++){
        console.log(pieceNo)
        this.dashboard.push({cols: 1, rows: 1, y: j, x: i, hasTitle: true, dragEnabled: true,  id: pieceNo, index:this.Image[pieceNo].index, image: this.Image[pieceNo]})
        pieceNo++
      }
    }
  }

  static itemChange(item, itemComponent) {
    // console.info('id', item.id);
    // console.info('index', item.index);
    console.log(itemComponent)
  }

  static itemResize(item, itemComponent) {
    // console.info('itemResized', item, itemComponent);
  }

  isSorted(indexes): Boolean {
    let i: number = 0;
    for (i = 0; i < indexes.length; i++) {
      if (indexes[i] !== i) {
        return false;
      }
    }
    return true;
  }

  randomize(imageParts: any[]): any[] {
    let i = 0, img: any[] = [], ran = 0;
    for (i = 0; i < imageParts.length; i++) {
      ran = Math.floor(Math.random() * imageParts.length);
      while (imageParts[ran] == null) {
        ran = Math.floor(Math.random() * imageParts.length);
      }
      img.push(imageParts[ran]);
      this.position.push(imageParts[ran].index);
      imageParts[ran] = null;
    }
    this.printIndexes(this.indexes);
    this.printIndexes(this.position);
    return img;
  }

  onDragStart(event: any, data: any): void {
    event.dataTransfer.setData('data', event.target.id);
  }
  onDrop(event: any ): void {
    console.log(event)
    console.log(event.dataTransfer.getData('data'))

    let origin = event.dataTransfer.getData('data');
    let dest = event.target.id;


    let originEl = document.getElementById(origin);
    let destEl = document.getElementById(dest);

    let origincss = originEl.style.cssText;
    let destcss = event.target.style.cssText;


    destEl.style.cssText = origincss;
    originEl.style.cssText = destcss;

    console.log(destEl.style.cssText)
    console.log(originEl.style.cssText)
    console.log(origincss)
    console.log(destcss)

    originEl.id = dest;
    destEl.id = origin;
    console.log(this.position)
    console.log(this.Image)

    for (let i = 0; i < this.position.length; i++) {
      if (this.position[i].toString() === originEl.id) {
        this.position[i] = Number(destEl.id);
      } else if (this.position[i].toString() === destEl.id) {
        this.position[i] = Number(originEl.id);
      }

    }

    this.printIndexes(this.position);
    this.steps++;
    this.gameComplete = this.isSorted(this.position);
    if (this.gameComplete) {

      if (this.timeVar) {
        this.timeVar.unsubscribe();
      }
    }

   
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    let origin = event.previousIndex
    let dest = event.currentIndex;


    let originEl = document.getElementById(`${origin}`);
    let destEl = document.getElementById(dest.toString());
    console.log(origin)
    console.log(originEl)
    let origincss = originEl.style.cssText;
    let destcss = destEl.style.cssText;


    destEl.style.cssText = origincss;
    originEl.style.cssText = destcss;

    // console.log(destEl.style.cssText)
    // console.log(originEl.style.cssText)
    // console.log(origincss)
    // console.log(destcss)

    originEl.id = dest.toString();
    destEl.id = origin.toString();
    console.log(this.position)
    // console.log(this.Image)
    moveItemInArray(this.position, event.previousIndex, event.currentIndex);
  }

  allowDrop(event): void {
    event.preventDefault();
    event.target.style.opacity = 1;
  }

  printIndexes(sorts: number[]): void {
    let i: number = 0, ind: string = '';
    for (i = 0; i < sorts.length; i++) {
      ind += sorts[i].toString() + ' , ';
    }
    console.log(ind);
  }

  reRandomize(): void {
    this.gameComplete = false;
    this.Image = this.randomize(this.Image);
  }

  startGame(): void {
    this.reset();
    this.initializeGame();
    this.breakImageParts();
    this.reRandomize();

    if (this.timeVar) {
      this.timeVar.unsubscribe();
    }
    this.timeVar = this.timer.subscribe(t => {
      this.settime(t);
    });
  }

  settime(t: number): void {
    this.ticks = Math.floor(t / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' +
      (t % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  }
  breakImageParts(): void {
    for (this.index = 0; this.index < this.totalBoxes; this.index++) {
      const x: string = (this.boxSize * (this.index % this.gridsize)) + '%';
      const y: string = (this.boxSize * Math.floor(this.index / this.gridsize)) + '%';
      let img: ImageBox = new ImageBox();
      img.x_pos = x;
      img.y_pos = y;
      img.index = this.index;
      this.indexes.push(this.index);
      this.Image.push(img);
    }
    console.log(this.Image[0])
    this.boxSize = this.imageSize / this.gridsize;
  }

  initializeGame(): void {

    this.gridsize = Number(this.difficulty);
    console.log(this.gridsize);
    this.boxSize = 100 / (this.gridsize - 1);
    this.index = 0;
    this.totalBoxes = this.gridsize * this.gridsize;
  }

  reset(): void {
    this.Image = [];
    this.indexes = [];
    this.position = [];
  }
}

class ImageBox {
  x_pos: string;
  y_pos: string;
  index: number;

}
