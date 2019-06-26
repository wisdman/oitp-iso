
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathMiddleTrainer = "math-middle"

export interface IMathMiddleTrainerItem {
  data: Array<number>,
  answer: string,
}

export interface IMathMiddleTrainerConfig extends ITrainerConfig {
  ui: IMathMiddleTrainer

  playTimeLimit: number

  type: "middle" | "sequence"
  items: Array<IMathMiddleTrainerItem>
}

export interface IMathMiddleTrainerResult extends ITrainerResult {
  config: IMathMiddleTrainerConfig
  success: number
  error: number
}
