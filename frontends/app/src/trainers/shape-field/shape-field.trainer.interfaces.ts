
import {
  IShape,
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IShapeFieldTrainer = "shape-field"

export interface IShapeFieldTrainerConfig extends ITrainerConfig {
  id: IShapeFieldTrainer
  items: Array<IShape>
  matrix: Array<number>
  isGameMode: boolean
}

export interface IShapeFieldTrainerResult extends ITrainerResult {
  config: IShapeFieldTrainerConfig
}
