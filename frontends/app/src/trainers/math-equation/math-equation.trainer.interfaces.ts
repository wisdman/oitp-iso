
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathEquationTrainer = "math-equation"

export interface IMathEquationTrainerConfig extends ITrainerConfig {
  id: IMathEquationTrainer

  timeLimit: number
}

export interface IMathEquationTrainerResult extends ITrainerResult {
  id: IMathEquationTrainer
  config: IMathEquationTrainerConfig

  success: number
  error: number
}
