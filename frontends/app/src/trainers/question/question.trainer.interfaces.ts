
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IQuestionTrainer = "question"

export interface IQuestionTrainerAnswer {
  data: string
  correct?: boolean

  isSelected?: boolean
}

export interface IQuestionTrainerConfig extends ITrainerConfig {
  id: IQuestionTrainer

  data: string
  button?: string

  itemsType?: "image" | "text"
  multiple?: boolean
  items?: Array<IQuestionTrainerAnswer>
}

export interface IQuestionTrainerResult extends ITrainerResult {
  id: IQuestionTrainer
  config: IQuestionTrainerConfig
  answers: Array<number>
  success: number
  error: number
}
