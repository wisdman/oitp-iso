import { ITrainerConfig } from "../interfaces"

export type ITextReadingTrainerID = "text-reading"
export type ITextReadingTrainerUI = "text-reading"

export interface ITextReadingTrainerConfig extends ITrainerConfig {
  id: ITextReadingTrainerID
  ui: ITextReadingTrainerUI

  data: string
}
