import { ITrainerConfig } from "../interfaces"

export type IWordsQuestionsWasteTrainerID = "words-questions-waste"
export type IWordsQuestionsWasteTrainerUI = "words-questions-waste"

export interface IWordsQuestionsWasteTrainerConfig extends ITrainerConfig {
  id: IWordsQuestionsWasteTrainerID
  ui: IWordsQuestionsWasteTrainerUI

  items: Array<{
    data: string,
    correct: boolean,
  }>
}
