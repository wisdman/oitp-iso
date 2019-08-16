
import { ITrainerConfig } from "../interfaces"

export type IMathSequenceID = "math-sequence"
export type IMathSequenceUI = "math-sequence"

export interface IMathSequenceConfig extends ITrainerConfig {
  id: IMathSequenceID
  ui: IMathSequenceUI

  items: Array<{
    rune: string
    data: number
    act: string
  }>
}
