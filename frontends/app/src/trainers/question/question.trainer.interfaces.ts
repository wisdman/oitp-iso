
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IQuestionTrainer = "question"

export interface IQuestionTrainerAnswer {
  type: "image" | "text"
  data: string
  correct?: boolean

  isSelected?: boolean
}

export interface IQuestionTrainerConfig extends ITrainerConfig {
  id: IQuestionTrainer
  body: string

  type?: "image" | "text"
  items?: Array<IQuestionTrainerAnswer>
  multiple?: boolean

  button?: string
}

export interface IQuestionTrainerResult extends ITrainerResult {
  id: IQuestionTrainer
  config: IQuestionTrainerConfig
  answers: Array<number>
  success: number
  error: number
}
