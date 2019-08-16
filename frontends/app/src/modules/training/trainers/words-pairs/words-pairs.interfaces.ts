import { ITrainerConfig } from "../interfaces"

export type IWordsPairsID = "words-pairs"
export type IWordsPairsUI = "words-pairs"

export interface IWordsPairsConfig extends ITrainerConfig {
  id: IWordsPairsID
  ui: IWordsPairsUI

  items: Array<[string, string]>
}
