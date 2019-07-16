
import { ITrainerConfig } from "../interfaces"

export type IImageCarpetsTrainerID = "image-carpets"
export type IImageCarpetsTrainerUI = "image-carpets"

export interface IImageCarpetsTrainerConfig extends ITrainerConfig {
  id: IImageCarpetsTrainerID
  ui: IImageCarpetsTrainerUI

  width: number
  height: number

  items: Array<{
    color: number
    items: Array<string>
  }>

  colors: Array<string>

  previewTimeLimit: number
}