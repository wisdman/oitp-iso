import { ITrainerConfig } from "../interfaces"

export type IWordsPairsTrainerID = "words-pairs"
export type IWordsPairsTrainerUI = "words-pairs"

export interface IWordsPairsTrainerConfig extends ITrainerConfig {
  id: IWordsPairsTrainerID
  ui: IWordsPairsTrainerUI

  items: Array<[string, string]>
}
