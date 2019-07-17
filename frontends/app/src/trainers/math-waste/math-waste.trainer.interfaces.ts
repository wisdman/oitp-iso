
import { ITrainerConfig } from "../interfaces"

export type IMathWasteTrainerID = "math-waste"
export type IMathWasteTrainerUI = "math-waste"

export interface IMathWasteTrainerConfig extends ITrainerConfig {
  id: IMathWasteTrainerID
  ui: IMathWasteTrainerUI

  items: Array<{
    data: number
    correct: boolean
  }>

  answer: string
}
