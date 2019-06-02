
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathWasteTrainer = "math-waste"

export interface IMathWasteTrainerConfig extends ITrainerConfig {
  id: IMathWasteTrainer

  playTimeLimit: number

  items: Array<number>
}

export interface IMathWasteTrainerResult extends ITrainerResult {
  id: IMathWasteTrainer
  config: IMathWasteTrainerConfig

  success: number
  error: number
}
