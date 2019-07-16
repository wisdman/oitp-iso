import { ITrainerConfig } from "../interfaces"

export type ISpaceQuestionWasteTrainerID = "space-waste-2d" | "space-waste-3d"
export type ISpaceQuestionWasteTrainerUI = "space-question-waste"

export interface ISpaceQuestionWasteTrainerConfig extends ITrainerConfig {
  id: ISpaceQuestionWasteTrainerID
  ui: ISpaceQuestionWasteTrainerUI

  items: Array<{
    data: string,
    correct: boolean,
  }>
}
