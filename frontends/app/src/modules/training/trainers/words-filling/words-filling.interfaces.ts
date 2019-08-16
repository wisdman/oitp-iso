import { ITrainerConfig } from "../interfaces"

export type IWordsFillingID = "words-filling"
export type IWordsFillingUI = "words-filling"

export interface IWordsFillingConfig extends ITrainerConfig {
  id: IWordsFillingID
  ui: IWordsFillingUI

  runes: Array<string>
}
