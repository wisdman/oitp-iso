
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathWasteTrainer = "math-waste"

export interface IMathWasteTrainerConfig extends ITrainerConfig {
  id: IMathWasteTrainer

  timeLimit: number

  type: "middle" | "sequence"
  items: Array<Array<number>> | Array<number>
}

export interface IMathWasteTrainerResult extends ITrainerResult {
  id: IMathWasteTrainer
  config: IMathWasteTrainerConfig

  success: number
  error: number
}
