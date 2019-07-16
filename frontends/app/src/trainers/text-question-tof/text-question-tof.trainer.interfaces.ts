import { ITrainerConfig } from "../interfaces"

export type ITextQuestionToFTrainerID = "storytelling" | "text-reading"
export type ITextQuestionToFTrainerUI = "text-question-tof"

export interface ITextQuestionToFTrainerConfig extends ITrainerConfig {
  id: ITextQuestionToFTrainerID
  ui: ITextQuestionToFTrainerUI

  data: string
  correct: boolean
}
