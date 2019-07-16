
import { ITrainerConfig } from "../interfaces"

export type IImageDifferencesTrainerID = "image-differences"
export type IImageDifferencesTrainerUI = "image-differences"

export interface IImageDifferencesTrainerConfig extends ITrainerConfig {
  id: IImageDifferencesTrainerID
  ui: IImageDifferencesTrainerUI

  A: number,
  B: number,
  differences?: Array<string>
}