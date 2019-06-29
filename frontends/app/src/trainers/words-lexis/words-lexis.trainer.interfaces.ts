
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsLexisTrainer = "words-lexis"

export interface IWordsLexisTrainerConfig extends ITrainerConfig {
  id: "words-lexis-antonyms" | "words-lexis-paronyms" | "words-lexis-synonyms"
  ui: IWordsLexisTrainer

  items: Array<[string, string]>

  playTimeLimit: number
}

export interface IWordsLexisTrainerResult extends ITrainerResult {
  config: IWordsLexisTrainerConfig
}
