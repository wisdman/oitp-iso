import { ITrainerConfig } from "../interfaces"

export type IWordsColumnID = "words-column"
export type IWordsColumnUI = "words-column"

export interface IWordsColumnConfig extends ITrainerConfig {
  id: IWordsColumnID
  ui: IWordsColumnUI

  items: Array<string>
}
