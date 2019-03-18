
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IQuestionTrainer = "question"

export type IQuestionTrainerAnswerType = "image" | "number" | "text"

export interface IQuestionTrainerAnswer {
  type: IQuestionTrainerAnswerType
  data: number | string
  correct?: boolean
}

export interface IQuestionTrainerImageAnswer extends IQuestionTrainerAnswer {
  type: "image"
  data: string
}

export interface IQuestionTrainerNumberAnswer extends IQuestionTrainerAnswer {
  type: "number"
  data: number
}

export interface IQuestionTrainerTextAnswer extends IQuestionTrainerAnswer {
  type: "text"
  data: string
}

export type IQuestionTrainerItem = IQuestionTrainerImageAnswer
                                 | IQuestionTrainerNumberAnswer
                                 | IQuestionTrainerTextAnswer

export interface IQuestionTrainerConfig extends ITrainerConfig {
  id: IQuestionTrainer
  header: string
  body: string
  items: Array<IQuestionTrainerItem>
  multiple?: boolean
}

export interface IQuestionTrainerResult extends ITrainerResult {
  id: IQuestionTrainer
  config: IQuestionTrainerConfig
}
