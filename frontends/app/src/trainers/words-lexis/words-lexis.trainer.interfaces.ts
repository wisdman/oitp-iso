import { ITrainerConfig } from "../interfaces"

export type IWordsLexisTrainerID = "words-lexis-antonyms" | "words-lexis-paronyms" | "words-lexis-synonyms"
export type IWordsLexisTrainerUI = "words-lexis"

export interface IWordsLexisTrainerConfig extends ITrainerConfig {
  id: IWordsLexisTrainerID
  ui: IWordsLexisTrainerUI

  items: Array<[string, string]>
}
