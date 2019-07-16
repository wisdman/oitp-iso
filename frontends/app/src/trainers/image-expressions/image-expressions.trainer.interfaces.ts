
import { ITrainerConfig } from "../interfaces"

export type IImageExpressionsTrainerID = "image-expressions"
export type IImageExpressionsTrainerUI = "image-expressions"

export interface IImageExpressionsTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsTrainerID
  ui: IImageExpressionsTrainerUI

  image: number
  data: string
}
