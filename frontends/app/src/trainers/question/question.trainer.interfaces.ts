
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IQuestionTrainer = "question"

export interface IQuestionTrainerAnswer {
  data: string
  correct: boolean

  x: number,
  y: number,
  fillPath: string,
  path: string,

  isSelected?: boolean
}

export interface IQuestionTrainerConfig extends ITrainerConfig {
  id: IQuestionTrainer

  body: string
  button?: string

  itemsType?: "image" | "icon" | "text" | "input-text" | "input-number",
  multiple?: boolean
  items?: Array<{
    data: string
    correct?: boolean
  }>

  timeLimit: number
}

export interface IQuestionTrainerResult extends ITrainerResult {
  id: IQuestionTrainer
  config: IQuestionTrainerConfig
  answers: Array<number>
  success: number
  error: number
}