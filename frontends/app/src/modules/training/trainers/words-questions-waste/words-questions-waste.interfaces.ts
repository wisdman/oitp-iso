import { ITrainerConfig } from "../interfaces"

export type IWordsQuestionsWasteID = "words-questions-waste"
export type IWordsQuestionsWasteUI = "words-questions-waste"

export interface IWordsQuestionsWasteConfig extends ITrainerConfig {
  id: IWordsQuestionsWasteID
  ui: IWordsQuestionsWasteUI

  items: Array<{
    data: string,
    correct: boolean,
  }>
}
