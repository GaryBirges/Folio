import { COLORS, SHAPES} from './constants';

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

export class Piece implements IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  //instantiate a random piece
  spawn() {
    const typeId = this.randomizeTetrominoType(SHAPES.length - 1);
    this.shape = SHAPES[typeId];
    this.color = COLORS[typeId];
    this.x = typeId === 4 ? 4 : 3;
    this.y = 0;
  }
  //show a black border for the next piece
  private addNextBorder(ctx: CanvasRenderingContext2D, x: number, y: number): void {
   ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1.025, 1.025);
  }

  //draw each point of the piece
  draw() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = this.color;
           // this.x & this.y = position on the board
          // x & y position are the positions of the shape
          const currentX = this.x + x;
          const currentY = this.y + y;
          this.ctx.fillRect(currentX, currentY, 1, 1);
        }
      });
    });
  }

  //draw next piece (with border)
  drawNext(ctxNext: CanvasRenderingContext2D) {
    ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);

    ctxNext.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.addNextBorder(ctxNext, x, y);
          ctxNext.fillStyle = this.color;
          //making space for the border
          const currentX = x + .025;
          const currentY = y + .025;
          ctxNext.fillRect(currentX, currentY, 1-.025, 1 -.025);
        }
      });
    });
  }

  //setting values for draw
  move(p: IPiece) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  randomizeTetrominoType(noOfTypes: number): number {
    return Math.floor(Math.random() * noOfTypes + 1);
  }

}