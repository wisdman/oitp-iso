
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IQuestionTrainer = "question"

export type IQuestionTrainerAnswerType = "image" | "text"

export interface IQuestionTrainerAnswer {
  type: IQuestionTrainerAnswerType
  data: string
  correct: boolean
}

export interface IQuestionTrainerImageAnswer extends IQuestionTrainerAnswer {
  type: "image"
}

export interface IQuestionTrainerTextAnswer extends IQuestionTrainerAnswer {
  type: "text"
}

export type IQuestionTrainerAnswers = IQuestionTrainerImageAnswer
                                    | IQuestionTrainerTextAnswer

export interface IQuestionTrainerConfig extends ITrainerConfig {
  id: IQuestionTrainer
  body: string
  answers: Array<IQuestionTrainerAnswers>
}

export interface IQuestionTrainerResult extends ITrainerResult {
  config: IQuestionTrainerConfig
}
