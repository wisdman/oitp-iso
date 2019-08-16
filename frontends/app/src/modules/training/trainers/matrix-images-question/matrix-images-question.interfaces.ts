import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesQuestionID = "matrix-filling-question"
export type IMatrixImagesQuestionUI = "matrix-images-question"

export interface IMatrixImagesQuestionConfig extends ITrainerConfig {
  id: IMatrixImagesQuestionID
  ui: IMatrixImagesQuestionUI

  playTimeLimit: number

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}
