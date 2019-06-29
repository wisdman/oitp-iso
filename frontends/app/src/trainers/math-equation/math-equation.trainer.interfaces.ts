
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathEquationTrainer = "math-equation"

export interface IMathEquationTrainerConfig extends ITrainerConfig {
  ui: IMathEquationTrainer

  playTimeLimit: number
  equation: string
}

export interface IMathEquationTrainerResult extends ITrainerResult {
  config: IMathEquationTrainerConfig
}
