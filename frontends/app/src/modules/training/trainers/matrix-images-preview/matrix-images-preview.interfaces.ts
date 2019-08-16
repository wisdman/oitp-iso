import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesPreviewID = "matrix-filling-pattern" | "matrix-filling-unique"
export type IMatrixImagesPreviewUI = "matrix-images-preview"

export interface IMatrixImagesPreviewConfig extends ITrainerConfig {
  id: IMatrixImagesPreviewID
  ui: IMatrixImagesPreviewUI

  items: Array<number>
  matrix: Array<number>
}
