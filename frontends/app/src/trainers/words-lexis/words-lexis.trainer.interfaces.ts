
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsLexisTrainer = "words-lexis"

export interface IWordsLexisTrainerConfig extends ITrainerConfig {
  id: IWordsLexisTrainer

  itemsType: "antonyms" | "paronyms" | "synonyms"
  items: Array<[string, string]>

  playTimeLimit: number
}

export interface IWordsLexisTrainerResult extends ITrainerResult {
  id: IWordsLexisTrainer
  config: IWordsLexisTrainerConfig
  success: number
}
