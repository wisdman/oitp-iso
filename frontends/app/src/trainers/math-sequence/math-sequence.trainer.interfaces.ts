
import { ITrainerConfig } from "../interfaces"

export type IMathSequenceTrainerID = "math-sequence"
export type IMathSequenceTrainerUI = "math-sequence"

export interface IMathSequenceTrainerConfig extends ITrainerConfig {
  id: IMathSequenceTrainerID
  ui: IMathSequenceTrainerUI

  items: Array<{
    rune: string
    data: number
    act: string
  }>
}
