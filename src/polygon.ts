import { gcd } from "./math";

class Vertex {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
  stretch(radius: number) {
    this.x = this.x * radius;
    this.y = this.y * radius;
  }
}

const calculateVertexPositions = (n: number) => {
  const vertices = [];
  for (let i = 0; i < n; i++) {
    let angle = (2 * i * Math.PI) / n - Math.PI / 2;
    vertices.push(new Vertex(Math.cos(angle), Math.sin(angle)));
  }

  return vertices;
};

export class Polygon {
  vertexCount: number;
  skipCount: number;
  vertices: Vertex[];
  polyPoints: Vertex[][];
  cSize: number;
  cNumber: number;

  constructor(vertexes: number, skip: number) {
    this.vertexCount = vertexes;
    this.skipCount = skip;
    this.vertices = [];
    this.polyPoints = [];
    this.cSize = this.vertexCount;
    this.cNumber = 1;

    this.calculate();
  }
  calculate() {
    let total = this.vertexCount * this.skipCount;

    let vertices = calculateVertexPositions(total);
    for (let i = 0; i < total; i = i + this.skipCount) {
      this.vertices.push(vertices[i]);
    }

    this.cNumber = gcd(this.vertexCount, this.skipCount);
    this.cSize = this.vertexCount / this.cNumber;

    let vIndex = 0;
    let currentPoly: Vertex[] = [];
    while (this.polyPoints.length != this.cNumber) {
      currentPoly.push(this.vertices[vIndex]);
      if (currentPoly.length == this.cSize) {
        this.polyPoints.push(currentPoly);
        currentPoly = [];
        vIndex = vIndex + 1;
      } else {
        vIndex = (vIndex + this.skipCount) % this.vertexCount;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, radius: number = 100) {

    for (const v of this.vertices) {
      v.stretch(radius);
    }

    let i = 0;

    for (const currentPoly of this.polyPoints) {
      ctx.strokeStyle = colors[i];
      ctx.beginPath();
      for (const point of currentPoly) {
        ctx.lineTo(point.x, point.y);
        ctx.moveTo(point.x, point.y);
        /* ctx.fillText(
          currentPoly.indexOf(point).toString(),
          point.x - 4,
          point.y - 10
        ); */
      }
      ctx.lineTo(currentPoly[0].x, currentPoly[0].y);
      ctx.stroke();
      ctx.fill();
      i++;
    }
  }
}

const colors = ["black", "red", "green", "hotpink", "cyan", "orange"];
