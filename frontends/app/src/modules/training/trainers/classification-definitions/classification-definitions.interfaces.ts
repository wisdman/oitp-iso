
import { ITrainerConfig } from "../interfaces"

export type IClassificationDefinitionsID = "classification-definitions"
export type IClassificationDefinitionsUI = "classification-definitions"

export interface IClassificationDefinitionsConfig extends ITrainerConfig {
  id: IClassificationDefinitionsID
  ui: IClassificationDefinitionsUI

  items: Array<{
    definition: string
    data: string
  }>
}
