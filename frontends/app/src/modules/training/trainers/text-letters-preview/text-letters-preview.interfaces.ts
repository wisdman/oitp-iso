import { ITrainerConfig } from "../interfaces"

export type ITextLettersPreviewID = "text-letters"
export type ITextLettersPreviewUI = "text-letters-preview"

export interface ITextLettersPreviewConfig extends ITrainerConfig {
  id: ITextLettersPreviewID
  ui: ITextLettersPreviewUI

  data: string
}
