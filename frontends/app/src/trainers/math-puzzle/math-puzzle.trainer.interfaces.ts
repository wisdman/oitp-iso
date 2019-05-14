
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMathPuzzleTrainer = "math-puzzle"
export const MathPuzzleTrainerID: IMathPuzzleTrainer = "math-puzzle"

export interface IMathPuzzleTrainerConfig extends ITrainerConfig {
  id: IMathPuzzleTrainer

  timeLimit: number

  type: "middle" | "sequence"
  items: Array<Array<number>> | Array<number>
}

export interface IMathPuzzleTrainerResult extends ITrainerResult {
  id: IMathPuzzleTrainer
  config: IMathPuzzleTrainerConfig

  success: number
  error: number
}
