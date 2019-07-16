
import { ITrainerConfig } from "../interfaces"

export type IImageExpressionsPreviewTrainerID = "image-expressions"
export type IImageExpressionsPreviewTrainerUI = "image-expressions-preview"

export interface IImageExpressionsPreviewTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsPreviewTrainerID
  ui: IImageExpressionsPreviewTrainerUI

  image: number
  data: string
}
