
import { ITrainerConfig } from "../interfaces"

export type IMathMiddleTrainerID = "math-middle"
export type IMathMiddleTrainerUI = "math-middle"

export interface IMathMiddleTrainerConfig extends ITrainerConfig {
  id: IMathMiddleTrainerID
  ui: IMathMiddleTrainerUI

  items: Array<{
    data: Array<number>,
    answer: string,
  }>
}
