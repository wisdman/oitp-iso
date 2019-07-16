import { ITrainerConfig } from "../interfaces"

export type IWordsFillingTrainerID = "words-filling"
export type IWordsFillingTrainerUI = "words-filling"

export interface IWordsFillingTrainerConfig extends ITrainerConfig {
  id: IWordsFillingTrainerID
  ui: IWordsFillingTrainerUI

  runes: Array<string>
}
