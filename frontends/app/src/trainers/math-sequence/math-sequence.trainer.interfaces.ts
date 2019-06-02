
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathSequenceTrainer = "math-sequence"

export interface IMathSequenceTrainerItem {
  rune: string,
  data: number,
  act: string,
}

export interface IMathSequenceTrainerConfig extends ITrainerConfig {
  id: IMathSequenceTrainer

  playTimeLimit: number

  items: Array<IMathSequenceTrainerItem>
}

export interface IMathSequenceTrainerResult extends ITrainerResult {
  id: IMathSequenceTrainer
  config: IMathSequenceTrainerConfig

  success: number
  error: number
}
