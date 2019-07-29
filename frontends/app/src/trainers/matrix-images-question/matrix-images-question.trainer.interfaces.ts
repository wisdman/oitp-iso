import { ITrainerConfig } from "../interfaces"

export type IMatrixImagesQuestionTrainerID = "matrix-filling-question"
export type IMatrixImagesQuestionTrainerUI = "matrix-images-question"

export interface IMatrixImagesQuestionTrainerConfig extends ITrainerConfig {
  id: IMatrixImagesQuestionTrainerID
  ui: IMatrixImagesQuestionTrainerUI

  playTimeLimit: number

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}
