
import { ITrainerConfig } from "../interfaces"

export type IImageExpressionsID = "image-expressions"
export type IImageExpressionsUI = "image-expressions"

export interface IImageExpressionsConfig extends ITrainerConfig {
  id: IImageExpressionsID
  ui: IImageExpressionsUI

  image: number
  data: string
}
