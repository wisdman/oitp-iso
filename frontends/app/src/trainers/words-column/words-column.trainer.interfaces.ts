import { ITrainerConfig } from "../interfaces"

export type IWordsColumnTrainerID = "words-column"
export type IWordsColumnTrainerUI = "words-column"

export interface IWordsColumnTrainerConfig extends ITrainerConfig {
  id: IWordsColumnTrainerID
  ui: IWordsColumnTrainerUI

  items: Array<string>

  previewTimeLimit: number
}
