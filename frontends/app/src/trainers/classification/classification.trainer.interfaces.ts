
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationTrainer = "classification"

export interface IClassificationTrainerItem {
  data: string
  group: string
}

export interface IClassificationTrainerConfig extends ITrainerConfig {
  id: IClassificationTrainer

  type: "colors" | "definitions" | "words"

  itemTimeLimit: number
  items: Array<IClassificationTrainerItem>
}

export interface IClassificationTrainerResult extends ITrainerResult {
  id: IClassificationTrainer
  config: IClassificationTrainerConfig

  success: number
  error: number
}
