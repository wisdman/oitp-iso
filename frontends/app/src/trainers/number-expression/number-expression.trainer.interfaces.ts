
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberExpressionTrainer = "number-expression"

export interface INumberExpressionTrainerConfig extends ITrainerConfig {
  id: INumberExpressionTrainer
  expression: Array<number | string>
}

export interface INumberExpressionTrainerResult extends ITrainerResult {
  id: INumberExpressionTrainer
  config: INumberExpressionTrainerConfig
}
