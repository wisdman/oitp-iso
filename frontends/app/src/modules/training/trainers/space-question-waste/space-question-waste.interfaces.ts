import { ITrainerConfig } from "../interfaces"

export type ISpaceQuestionWasteID = "space-waste-2d" | "space-waste-3d"
export type ISpaceQuestionWasteUI = "space-question-waste"

export interface ISpaceQuestionWasteConfig extends ITrainerConfig {
  id: ISpaceQuestionWasteID
  ui: ISpaceQuestionWasteUI

  items: Array<{
    data: string,
    correct: boolean,
  }>
}
