
import { ITrainerConfig } from "../interfaces"

export type IClassificationDefinitionsTrainerID = "classification-definitions"
export type IClassificationDefinitionsTrainerUI = "classification-definitions"

export interface IClassificationDefinitionsTrainerConfig extends ITrainerConfig {
  id: IClassificationDefinitionsTrainerID
  ui: IClassificationDefinitionsTrainerUI

  items: Array<{
    definition: string
    data: string
  }>
}
