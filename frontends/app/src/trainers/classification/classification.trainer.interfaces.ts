
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationTrainer = "classification"
export const ClassificationTrainerID: IClassificationTrainer = "classification"

export type IClassificationTrainerItem = {
  data: string
  group: string
}

export type IClassificationTrainerGroup = {
  data: string
  isSuccess?: boolean
  isError?: boolean
}

export interface IClassificationTrainerConfig extends ITrainerConfig {
  id: IClassificationTrainer

  type: "colors" | "texts" | "images"

  itemTimeLimit: number
  items: Array<IClassificationTrainerItem>
}

export interface IClassificationTrainerResult extends ITrainerResult {
  id: IClassificationTrainer
  config: IClassificationTrainerConfig

  success: number
  error: number
}
