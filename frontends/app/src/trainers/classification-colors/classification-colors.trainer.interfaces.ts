
import { ITrainerConfig } from "../interfaces"

export type IClassificationColorsTrainerID = "classification-colors"
export type IClassificationColorsTrainerUI = "classification-colors"

export interface IClassificationColorsTrainerConfig extends ITrainerConfig {
  id: IClassificationColorsTrainerID
  ui: IClassificationColorsTrainerUI

  items: Array<{
    color: string
    data: string
  }>
}
