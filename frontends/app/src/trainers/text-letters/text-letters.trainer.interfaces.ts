import { ITrainerConfig } from "../interfaces"

export type ITextLettersTrainerID = "text-letters"
export type ITextLettersTrainerUI = "text-letters"

export interface ITextLettersTrainerConfig extends ITrainerConfig {
  id: ITextLettersTrainerID
  ui: ITextLettersTrainerUI

  data: string
  runes: Array<string>
}
