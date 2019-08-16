
import { ITrainerConfig } from "../interfaces"

export type IClassificationColorsID = "classification-colors"
export type IClassificationColorsUI = "classification-colors"

export interface IClassificationColorsConfig extends ITrainerConfig {
  id: IClassificationColorsID
  ui: IClassificationColorsUI

  items: Array<{
    color: string
    data: string
  }>
}
