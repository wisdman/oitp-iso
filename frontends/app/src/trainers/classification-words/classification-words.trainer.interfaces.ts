
import { ITrainerConfig } from "../interfaces"

export type IClassificationWordsTrainerID = "classification-words"
export type IClassificationWordsTrainerUI = "classification-words"

export interface IClassificationWordsTrainerConfig extends ITrainerConfig {
  id: IClassificationWordsTrainerID
  ui: IClassificationWordsTrainerUI

  items: Array<{
    word: string
    data: string
  }>
}