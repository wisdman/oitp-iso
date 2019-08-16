import { ITrainerConfig } from "../interfaces"

export type IWordsQuestionsCloseID = "words-questions-close"
export type IWordsQuestionsCloseUI = "words-questions-close"

export interface IWordsQuestionsCloseConfig extends ITrainerConfig {
  id: IWordsQuestionsCloseID
  ui: IWordsQuestionsCloseUI

  word: string
  items: Array<{
    data: string,
    correct: boolean,
  }>
}
