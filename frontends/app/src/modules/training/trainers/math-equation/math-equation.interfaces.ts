
import { ITrainerConfig } from "../interfaces"

export type IMathEquationID = "math-equation"
export type IMathEquationUI = "math-equation"

export interface IMathEquationConfig extends ITrainerConfig {
  id: IMathEquationID
  ui: IMathEquationUI

  equation: string
}
