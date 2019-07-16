import { ITrainerConfig } from "../interfaces"

export type ITextLettersPreviewTrainerID = "text-letters"
export type ITextLettersPreviewTrainerUI = "text-letters-preview"

export interface ITextLettersPreviewTrainerConfig extends ITrainerConfig {
  id: ITextLettersPreviewTrainerID
  ui: ITextLettersPreviewTrainerUI

  data: string
}
