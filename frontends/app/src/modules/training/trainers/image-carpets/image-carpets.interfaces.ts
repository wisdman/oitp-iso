
import { ITrainerConfig } from "../interfaces"

export type IImageCarpetsID = "image-carpets"
export type IImageCarpetsUI = "image-carpets"

export interface IImageCarpetsConfig extends ITrainerConfig {
  id: IImageCarpetsID
  ui: IImageCarpetsUI

  width: number
  height: number

  items: Array<{
    color: number
    group: number
    d: string
  }>

  colors: Array<string>
}