
import {
  IGetPointConfig,
  IGetLineConfig,
  IGetTriangleConfig,
  IGetSquareConfig,
  IGetParallelogramConfig,
  IGetPolygonConfig,
  IGetEllipseConfig,

  getPoint,
  getLine,
  getTriangle,
  getSquare,
  getParallelogram,
  getPolygon,
  getEllipse,

  rotate,
} from "./functions"

interface IPointConfig extends IGetPointConfig {
  type: "point"
}

interface ILineConfig extends IGetLineConfig {
  type: "line"
}

interface ITriangleConfig extends IGetTriangleConfig {
  type: "triangle"
}

interface ISquareConfig extends IGetSquareConfig {
  type: "square"
}

interface IParallelogramConfig extends IGetParallelogramConfig {
  type: "parallelogram"
}

interface IPolygonConfig extends IGetPolygonConfig {
  type: "polygon"
}

interface IEllipseConfig extends IGetEllipseConfig {
  type: "ellipse"
}


interface IShapeConfig {
  id: number
  fill?: string
  stroke?: string
  rotate?: number
}

export abstract class Shape {
  fill: string
  stroke: string
  rotate: number

  width!: number
  height!: number
  minx!: number
  miny!: number

  shape: string = ""

  id: number
  type!: "polygon" | "ellipse"
  data!: Array<Array<number>>

  get value() {
    return this.data
  }

  constructor({
    id,
    fill = "none",
    stroke = "#000",
    rotate = 0,
  }: IShapeConfig) {
    this.id = id
    this.fill = fill
    this.stroke = stroke
    this.rotate = rotate
  }

  getImage(): string {
    return "data:image/svg+xml;base64," + window.btoa(this.getSVG())
  }

  getSVG() {
    const width = Math.ceil(this.width) + 4
    const height = Math.ceil(this.height) + 4
    const minx =  Math.ceil(this.minx) - 2
    const miny =  Math.ceil(this.miny) - 2
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minx} ${miny} ${width} ${height}">${this.shape}</svg>`
  }
}

export class Poligon extends Shape {
  constructor(config: IShapeConfig & (IPointConfig
                                    | ILineConfig
                                    | ITriangleConfig
                                    | ISquareConfig
                                    | IParallelogramConfig
                                    | IPolygonConfig)) {
    super(config)
    this.type = "polygon"

    switch (config.type) {
      case "point":
        this.data = getPoint(config)
        break;

      case "line":
        this.data = getLine(config)
        break;

      case "triangle":
        this.data = getTriangle(config)
        break;

      case "square":
        this.data = getSquare(config)
        break;

      case "parallelogram":
        this.data = getParallelogram(config)
        break;

      case "polygon":
        this.data = getPolygon(config)
        break;

      default:
        throw new TypeError("Incorrect shape type")
        break;
    }

    this.data = rotate(this.data, this.rotate)
                    .map(([x,y]) => [Math.round(x*1000)/1000, Math.round(y*1000)/1000])

    this.shape = `<polygon fill="${this.fill}" stroke="${this.stroke}" stroke-width="2" points="${this.data.join(' ')}"/>`

    let [minx, maxx, miny, maxy] = this.data.reduce(([minx, maxx, miny, maxy], [x,y]) => {
      minx = Math.min(minx, x)
      maxx = Math.max(maxx, x)
      miny = Math.min(miny, y)
      maxy = Math.max(maxy, y)
      return [minx, maxx, miny, maxy]
    }, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])

    this.minx = minx
    this.miny = miny
    this.width = maxx - minx
    this.height = maxy - miny
  }
}

export class Ellipse extends Shape {
  constructor(config: IShapeConfig & IEllipseConfig) {
    super(config)
    this.type = "ellipse"

    switch (config.type) {
      case "ellipse":
        this.data = [getEllipse(config)]
        break;

      default:
        throw new TypeError("Incorrect shape type")
        break;
    }

    const [[rx, ry]] = this.data

    this.shape = `<ellipse fill="${this.fill}" stroke="${this.stroke}" stroke-width="2" cx="0" cy="0" rx="${rx}" ry="${ry}"/>`

    this.minx = rx * -1
    this.miny = ry * -1
    this.width = rx * 2
    this.height = ry * 2
  }
}
