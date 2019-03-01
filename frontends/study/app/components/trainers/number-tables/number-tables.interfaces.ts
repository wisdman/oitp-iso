
export type IMatrixItem = {
  value: number
  color?: string
  success?: boolean
  error?: boolean
}

export type IMatrix = Array<IMatrixItem>

export type IConfig = {
  columns: number
  rows: number
  start: number
  last: number
  matrix: IMatrix
}

export type IResult = {
  success: number
  error: number
  step: number
  isFinish: boolean
}