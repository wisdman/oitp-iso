
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationWordsTrainer = "classification-words"
export const ClassificationWordsTrainerID: IClassificationWordsTrainer = "classification-words"

export type IClassificationWordsTrainerItem = {
  data: string
  group: string
}

export type IClassificationWordsTrainerMatrixItem = {
  data: string

  x: number,
  y: number,
  fillPath: string,
  path: string,

  isSuccess?: boolean
  isError?: boolean
}

export interface IClassificationWordsTrainerConfig extends ITrainerConfig {
  id: IClassificationWordsTrainer
  items: Array<IClassificationWordsTrainerItem>
  timeLimit: number
  wordTimeLimit: number
}

export interface IClassificationWordsTrainerResult extends ITrainerResult {
  id: IClassificationWordsTrainer
  config: IClassificationWordsTrainerConfig

  success: number
  error: number
}
