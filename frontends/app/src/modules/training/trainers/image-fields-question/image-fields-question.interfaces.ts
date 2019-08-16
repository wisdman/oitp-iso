import { ITrainerConfig } from "../interfaces"

export type IImageFieldsQuestionID = "image-fields"
export type IImageFieldsQuestionUI = "image-fields-question"

export interface IImageFieldsQuestionConfig extends ITrainerConfig {
  id: IImageFieldsQuestionID
  ui: IImageFieldsQuestionUI

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}
