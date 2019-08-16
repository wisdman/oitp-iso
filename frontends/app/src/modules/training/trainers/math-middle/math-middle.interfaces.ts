
import { ITrainerConfig } from "../interfaces"

export type IMathMiddleID = "math-middle"
export type IMathMiddleUI = "math-middle"

export interface IMathMiddleConfig extends ITrainerConfig {
  id: IMathMiddleID
  ui: IMathMiddleUI

  items: Array<{
    data: Array<number>,
    answer: string,
  }>
}
