import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesPreviewTrainerID = "matrix-filling-pattern" | "matrix-filling-unique"
export type IMatrixImagesPreviewTrainerUI = "matrix-images-preview"

export interface IMatrixImagesPreviewTrainerConfig extends ITrainerConfig {
  id: IMatrixImagesPreviewTrainerID
  ui: IMatrixImagesPreviewTrainerUI

  items: Array<number>
  matrix: Array<number>
}
