
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationTrainer = "classification"

export type IClassificationTrainerItem = {
  data: string,
  group: string,
}

export interface IClassificationTrainerConfig extends ITrainerConfig {
  id: IClassificationTrainer
  type: "image" | "text" | "color"
  items: Array<IClassificationTrainerItem>
  itemTimeout: number
}

export interface IClassificationTrainerResult extends ITrainerResult {
  id: IClassificationTrainer
  config: IClassificationTrainerConfig

  success: number
}
