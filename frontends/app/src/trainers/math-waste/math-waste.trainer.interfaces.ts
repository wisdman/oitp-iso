
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathWasteTrainer = "math-waste"

export interface IMathWasteTrainerConfig extends ITrainerConfig {
  ui: IMathWasteTrainer

  playTimeLimit: number

  items: Array<number>
}

export interface IMathWasteTrainerResult extends ITrainerResult {
  config: IMathWasteTrainerConfig
}
