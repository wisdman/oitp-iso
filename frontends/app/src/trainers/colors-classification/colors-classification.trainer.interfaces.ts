
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IСolorsСlassificationTrainer = "colors-classification"

export interface IСolorsСlassificationTrainerItem {
  rgb: string,
  title: string,
}

export interface IСolorsСlassificationTrainerConfig extends ITrainerConfig {
  id: IСolorsСlassificationTrainer
  items: Array<IСolorsСlassificationTrainerItem>
}

export interface IСolorsСlassificationTrainerResult extends ITrainerResult {
  id: IСolorsСlassificationTrainer
  config: IСolorsСlassificationTrainerConfig
  success: number,
  error: number,
  current: number,
}
