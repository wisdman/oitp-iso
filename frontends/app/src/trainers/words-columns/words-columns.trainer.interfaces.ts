
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsColumnsTrainer = "words-columns"

export type IWordsColumnsTrainerColumn = {
  id: string,
  title: string,
}

export type IWordsColumnsTrainerWord = {
  id: string,
  word: string,
}

export interface IWordsColumnsTrainerConfig extends ITrainerConfig {
  id: IWordsColumnsTrainer

  columns: Array<IWordsColumnsTrainerColumn>
  words: Array<IWordsColumnsTrainerWord>
}

export interface IWordsColumnsTrainerResult extends ITrainerResult {
  config: IWordsColumnsTrainerConfig
  success: number
  error: number
}
