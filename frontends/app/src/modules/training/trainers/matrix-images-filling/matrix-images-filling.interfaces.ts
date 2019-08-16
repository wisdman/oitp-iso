import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesFillingID = "matrix-filling-pattern" | "matrix-filling-unique"
export type IMatrixImagesFillingUI = "matrix-images-filling"

export interface IMatrixImagesFillingConfig extends ITrainerConfig {
  id: IMatrixImagesFillingID
  ui: IMatrixImagesFillingUI

  items: Array<number>
  matrix: Array<number>
}
