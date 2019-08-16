import { ITrainerConfig } from "../interfaces"

export type ITextReadingID = "text-reading"
export type ITextReadingUI = "text-reading"

export interface ITextReadingConfig extends ITrainerConfig {
  id: ITextReadingID
  ui: ITextReadingUI

  text: string
}
