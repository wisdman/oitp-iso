import { ITrainerConfig } from "../interfaces"

export type IImageFieldsQuestionTrainerID = "image-fields"
export type IImageFieldsQuestionTrainerUI = "image-fields-question"

export interface IImageFieldsQuestionTrainerConfig extends ITrainerConfig {
  id: IImageFieldsQuestionTrainerID
  ui: IImageFieldsQuestionTrainerUI

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}
