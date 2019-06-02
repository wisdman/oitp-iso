
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationWordsTrainer = "classification-words"

export interface IClassificationWordsTrainerItem {
  word: string
  data: string
}

export interface IClassificationWordsTrainerConfig extends ITrainerConfig {
  id: IClassificationWordsTrainer

  itemTimeLimit: number
  items: Array<IClassificationWordsTrainerItem>
}

export interface IClassificationWordsTrainerResult extends ITrainerResult {
  id: IClassificationWordsTrainer
  config: IClassificationWordsTrainerConfig

  success: number
  error: number
}
