
import { ITrainerConfig } from "../interfaces"

export type IMathWasteID = "math-waste"
export type IMathWasteUI = "math-waste"

export interface IMathWasteConfig extends ITrainerConfig {
  id: IMathWasteID
  ui: IMathWasteUI

  items: Array<{
    data: number
    correct: boolean
  }>

  answer: string
}
