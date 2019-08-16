
import { ITrainerConfig } from "../interfaces"

export type IImageDifferencesID = "image-differences"
export type IImageDifferencesUI = "image-differences"

export interface IImageDifferencesConfig extends ITrainerConfig {
  id: IImageDifferencesID
  ui: IImageDifferencesUI

  A: number,
  B: number,
  differences?: Array<string>
}