
import { UUID } from "../uuid"

import { IArticleTrainer, IArticleTrainerConfig, IArticleTrainerResult } from "./article"
import { IColorsColumnsTrainer, IColorsColumnsTrainerConfig, IColorsColumnsTrainerResult } from "./colors-columns"
import { IFirstLettersTrainer, IFirstLettersTrainerConfig, IFirstLettersTrainerResult } from "./first-letters"
import { IIconsTableTrainer, IIconsTableTrainerConfig, IIconsTableTrainerResult } from "./icons-table"
import { IImageConstructorTrainer, IImageConstructorTrainerConfig, IImageConstructorTrainerResult } from "./image-constructor"
import { IMessageTrainer, IMessageTrainerConfig, IMessageTrainerResult } from "./message"
import { INumberTableTrainer, INumberTableTrainerConfig, INumberTableTrainerResult } from "./number-table"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IResultsTrainer, IResultsTrainerConfig, IResultsTrainerResult } from "./results"
import { IWordsColumnsTrainer, IWordsColumnsTrainerConfig, IWordsColumnsTrainerResult } from "./words-columns"

export type ITrainer = IArticleTrainer
                     | IColorsColumnsTrainer
                     | IFirstLettersTrainer
                     | IIconsTableTrainer
                     | IImageConstructorTrainer
                     | IMessageTrainer
                     | INumberTableTrainer
                     | IQuestionTrainer
                     | IResultsTrainer
                     | IWordsColumnsTrainer

export type ITrainerConfigs = IArticleTrainerConfig
                            | IColorsColumnsTrainerConfig
                            | IFirstLettersTrainerConfig
                            | IIconsTableTrainerConfig
                            | IImageConstructorTrainerConfig
                            | IMessageTrainerConfig
                            | INumberTableTrainerConfig
                            | IQuestionTrainerConfig
                            | IResultsTrainerConfig
                            | IWordsColumnsTrainerConfig

export type ITrainerResults = IArticleTrainerResult
                            | IColorsColumnsTrainerResult
                            | IFirstLettersTrainerResult
                            | IIconsTableTrainerResult
                            | IImageConstructorTrainerResult
                            | IMessageTrainerResult
                            | INumberTableTrainerResult
                            | IQuestionTrainerResult
                            | IResultsTrainerResult
                            | IWordsColumnsTrainerResult

export interface ITrainerConfig {
  id: ITrainer
  uid: UUID
  timeLimit?: number
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

export interface IImage {
  id: number
  data?: string
  background?: string
}

export interface IСell<T> {
  value: T
  success?: boolean
  error?: boolean
}
