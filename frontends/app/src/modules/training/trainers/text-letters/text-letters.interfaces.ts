import { ITrainerConfig } from "../interfaces"

export type ITextLettersID = "text-letters"
export type ITextLettersUI = "text-letters"

export interface ITextLettersConfig extends ITrainerConfig {
  id: ITextLettersID
  ui: ITextLettersUI

  expression: string
  runes: Array<string>
}
