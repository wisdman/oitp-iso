import { ITrainerConfig } from "../interfaces"

export type IWordsLexisID = "words-lexis-antonyms" | "words-lexis-paronyms" | "words-lexis-synonyms"
export type IWordsLexisUI = "words-lexis"

export interface IWordsLexisConfig extends ITrainerConfig {
  id: IWordsLexisID
  ui: IWordsLexisUI

  items: Array<[string, string]>
}
