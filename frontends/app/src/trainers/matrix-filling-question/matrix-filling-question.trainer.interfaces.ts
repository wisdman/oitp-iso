import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixFillingQuestionTrainer = "matrix-filling-question"

export interface IMatrixFillingQuestionTrainerConfig extends ITrainerConfig {
  id: IMatrixFillingQuestionTrainer

  playTimeLimit: number

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}

export interface IMatrixFillingQuestionTrainerResult extends ITrainerResult {
  config: IMatrixFillingQuestionTrainerConfig
}