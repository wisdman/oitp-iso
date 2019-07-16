import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesFillingTrainerID = "matrix-filling-pattern" | "matrix-filling-unique"
export type IMatrixImagesFillingTrainerUI = "matrix-images-filling"

export interface IMatrixImagesFillingTrainerConfig extends ITrainerConfig {
  id: IMatrixImagesFillingTrainerID
  ui: IMatrixImagesFillingTrainerUI

  items: Array<number>
  matrix: Array<number>
}
