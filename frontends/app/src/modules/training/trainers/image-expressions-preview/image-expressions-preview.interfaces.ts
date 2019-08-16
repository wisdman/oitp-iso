
import { ITrainerConfig } from "../interfaces"

export type IImageExpressionsPreviewID = "image-expressions"
export type IImageExpressionsPreviewUI = "image-expressions-preview"

export interface IImageExpressionsPreviewConfig extends ITrainerConfig {
  id: IImageExpressionsPreviewID
  ui: IImageExpressionsPreviewUI

  image: number
  data: string
}
