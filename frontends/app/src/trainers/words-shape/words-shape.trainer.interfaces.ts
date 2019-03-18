
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsShapeTrainer = "words-shape"

export interface IWordsShapeTrainerConfig extends ITrainerConfig {
  id: IWordsShapeTrainer
}

export interface IWordsShapeTrainerResult extends ITrainerResult {
  config: IWordsShapeTrainerConfig
}
