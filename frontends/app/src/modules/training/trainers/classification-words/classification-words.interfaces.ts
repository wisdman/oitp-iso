
import { ITrainerConfig } from "../interfaces"

export type IClassificationWordsID = "classification-words"
export type IClassificationWordsUI = "classification-words"

export interface IClassificationWordsConfig extends ITrainerConfig {
  id: IClassificationWordsID
  ui: IClassificationWordsUI

  items: Array<{
    group: string
    words: Array<string>
  }>
}