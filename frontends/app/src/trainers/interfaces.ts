
import { IColorsColumnsTrainer, IColorsColumnsTrainerConfig, IColorsColumnsTrainerResult } from "./colors-columns"
import { IFirstLettersTrainer, IFirstLettersTrainerConfig, IFirstLettersTrainerResult } from "./first-letters"
import { IImageTableTrainer, IImageTableTrainerConfig, IImageTableTrainerResult } from "./image-table"
import { IMessageTrainer, IMessageTrainerConfig, IMessageTrainerResult } from "./message"
import { INumberTableTrainer, INumberTableTrainerConfig, INumberTableTrainerResult } from "./number-table"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IResultsTrainer, IResultsTrainerConfig, IResultsTrainerResult } from "./results"
import { IShapeFieldTrainer, IShapeFieldTrainerConfig, IShapeFieldTrainerResult } from "./shape-field"
import { ITezirovanieTrainer, ITezirovanieTrainerConfig, ITezirovanieTrainerResult } from "./tezirovanie"
import { IWordsColumnsTrainer, IWordsColumnsTrainerConfig, IWordsColumnsTrainerResult } from "./words-columns"

export type ITrainer = IColorsColumnsTrainer
                     | IFirstLettersTrainer
                     | IImageTableTrainer
                     | IShapeFieldTrainer
                     | IMessageTrainer
                     | INumberTableTrainer
                     | IQuestionTrainer
                     | IResultsTrainer
                     | ITezirovanieTrainer
                     | IWordsColumnsTrainer

export type ITrainerConfigs = IColorsColumnsTrainerConfig
                            | IFirstLettersTrainerConfig
                            | IImageTableTrainerConfig
                            | IShapeFieldTrainerConfig
                            | IMessageTrainerConfig
                            | INumberTableTrainerConfig
                            | IQuestionTrainerConfig
                            | IResultsTrainerConfig
                            | ITezirovanieTrainerConfig
                            | IWordsColumnsTrainerConfig

export type ITrainerResults = IColorsColumnsTrainerResult
                            | IFirstLettersTrainerResult
                            | IImageTableTrainerResult
                            | IShapeFieldTrainerResult
                            | IMessageTrainerResult
                            | INumberTableTrainerResult
                            | IQuestionTrainerResult
                            | IResultsTrainerResult
                            | ITezirovanieTrainerResult
                            | IWordsColumnsTrainerResult

export interface ITrainerConfig {
  id: ITrainer
  uid: string
  timeLimit?: number

  globalTimeLimit?: number
}

export interface ITrainerResult {
  id: ITrainer
  config: ITrainerConfig

  isFinish?: boolean

  time?: number
  isTimeout?: boolean

  success?: number
  error?: number
}


// === Common ressources ===

export type IShapeType = "polygon" | "ellipse"

export interface IShape {
  id: number

  type: IShapeType
  data: Array<Array<number>>

  fill: string
  stroke: string
}

export interface IImage {
  id: number
  data: string

  background?: string
}

export interface IСell<T> {
  value: T
  success?: boolean
  error?: boolean
}
