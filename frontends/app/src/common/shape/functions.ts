
// === Poligon functions ===

export interface IGetPointConfig {}
export function getPoint(_: IGetPointConfig = { type: "point" }) {
  return [[0, 0]]
  // A
}

export interface IGetLineConfig {
  width: number
}
export function getLine({width}: IGetLineConfig) {
  const A = [width / -2, 0]
  const B = [width / 2, 0]
  return [A, B]
  // A---B
}

export interface IGetTriangleConfig {
  width: number
  height?: number
  side?: "left" | "center" | "right"
}
export function getTriangle({
  width,
  height,
  side = "center"
}:IGetTriangleConfig) {
  height = height === undefined ? width : height
  const A = [width / -2, height / 2]
  const B = [width / 2, height / 2]
  const C = [side === "left" ? width / -2 : side === "right" ? width / 2 : 0, height / -2]

  return setCenter([A, B, C])
  //   C
  //  / \
  // A---B
}

export interface IGetSquareConfig {
  width: number
}
export function getSquare({
  width,
}:IGetSquareConfig) {
  const A = [ width / -2, width / 2]
  const B = [ width / 2, width / 2]
  const C = [ width / 2, width / -2]
  const D = [ width / -2, width / -2]
  return [A, B, C, D]
  // D---C
  // |   |
  // A---B
}

export interface IGetParallelogramConfig {
  width: number
  height?: number
  offset?: number
}
export function getParallelogram({
  width,
  height,
  offset = 0
}:IGetParallelogramConfig) {
  height = height === undefined ? width : height

  const A = [ (width + offset) / -2,  height / 2]
  const B = [ (width + offset) / 2 - offset, height / 2]
  const C = [ (width + offset) / 2, height / -2]
  const D = [ (width + offset) / -2 + offset, height / -2]
  return setCenter([A, B, C, D])
  //   D---C
  //  /   /
  // A---B
}

export interface IGetPolygonConfig {
  width: number
  vertex?: number
}
export function getPolygon({
  width,
  vertex = 5
}: IGetPolygonConfig) {
  switch (vertex) {
    case 1:
      return getPoint()
      break;

    case 2:
      return getLine({width})
      break;

    case 3:
      return getTriangle({width})
      break;

    case 4:
      return getSquare({width})
      break;
  }

  const angle = 360 / vertex
  const radius = width / 2
  const matrix = Array.from(Array(vertex), (_, i) => ({ theta: (Math.PI * angle * i) / 180, r: radius }))
       .map(({ r, theta }) => [
          r * Math.cos(theta),
          r * Math.sin(theta),
       ])

  return matrix
}


// === Ellipse functions ===

export interface IGetEllipseConfig {
  rx: number
  ry?: number
}
export function getEllipse({
  rx,
  ry,
}: IGetEllipseConfig) {
  return [rx, ry === undefined ? rx : ry]
}


// === Еrigonometric functions ===

export function rotate(matrix: Array<Array<number>>, fi: number) {
  return matrix.map(([x,y]) => [x*Math.cos(fi) - y*Math.sin(fi),  x*Math.sin(fi) + y*Math.cos(fi) ] )
}

export function center(matrix: Array<Array<number>>) {
  const [px, py] = matrix.reduce(([px,py], [x,y]) => [px+x, py+y], [0,0])
  return [px / matrix.length, py / matrix.length]
}

export function setCenter(matrix: Array<Array<number>>) {
  const [dx, dy] = center(matrix)
  return matrix.map(([x, y]) => [x - dx, y - dy])
}


