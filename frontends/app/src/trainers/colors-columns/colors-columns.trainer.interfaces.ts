
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IColorsColumnsTrainer = "colors-columns"

export type IColorsColumnsTrainerColor = {
  rgb: string,
  title: string,
}

export interface IColorsColumnsTrainerConfig extends ITrainerConfig {
  id: IColorsColumnsTrainer

  columns: Array<string>
  colors: Array<IColorsColumnsTrainerColor>
}

export interface IColorsColumnsTrainerResult extends ITrainerResult {
  config: IColorsColumnsTrainerConfig
  success: number
  error: number
}
