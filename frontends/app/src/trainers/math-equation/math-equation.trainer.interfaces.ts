
import { ITrainerConfig } from "../interfaces"

export type IMathEquationTrainerID = "math-equation"
export type IMathEquationTrainerUI = "math-equation"

export interface IMathEquationTrainerConfig extends ITrainerConfig {
  id: IMathEquationTrainerID
  ui: IMathEquationTrainerUI

  equation: string
}
