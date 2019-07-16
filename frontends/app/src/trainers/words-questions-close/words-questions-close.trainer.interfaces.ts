import { ITrainerConfig } from "../interfaces"

export type IWordsQuestionsCloseTrainerID = "words-questions-close"
export type IWordsQuestionsCloseTrainerUI = "words-questions-close"

export interface IWordsQuestionsCloseTrainerConfig extends ITrainerConfig {
  id: IWordsQuestionsCloseTrainerID
  ui: IWordsQuestionsCloseTrainerUI

  word: string
  items: Array<{
    data: string,
    correct: boolean,
  }>
}
