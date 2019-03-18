
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberShapeTrainer = "number-shape"

export interface INumberShapeTrainerConfig extends ITrainerConfig {
  id: INumberShapeTrainer
}

export interface INumberShapeTrainerResult extends ITrainerResult {
  config: INumberShapeTrainerConfig
}
