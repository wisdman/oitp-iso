
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsClassificationTrainer = "words-classification"

export type IWordsClassificationTrainerItem = {
  group: string,
  items: Array<string>,
}

export interface IWordsClassificationTrainerConfig extends ITrainerConfig {
  id: IWordsClassificationTrainer
  items: Array<IWordsClassificationTrainerItem>
}

export interface IWordsClassificationTrainerResult extends ITrainerResult {
  id: IWordsClassificationTrainer
  config: IWordsClassificationTrainerConfig

  success: number,
  error: number,
  current: number,
}
