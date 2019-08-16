import { ITrainerConfig } from "../interfaces"

export type ITextQuestionToFID = "storytelling" | "text-reading"
export type ITextQuestionToFUI = "text-question-tof"

export interface ITextQuestionToFConfig extends ITrainerConfig {
  id: ITextQuestionToFID
  ui: ITextQuestionToFUI

  data: string
  correct: boolean
}
