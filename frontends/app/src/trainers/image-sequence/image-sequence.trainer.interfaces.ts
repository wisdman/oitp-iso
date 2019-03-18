
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageSequenceTrainer = "image-sequence"

export interface IImageSequenceTrainerConfig extends ITrainerConfig {
  id: IImageSequenceTrainer
  items: Array<string>
}

export interface IImageSequenceTrainerResult extends ITrainerResult {
  config: IImageSequenceTrainerConfig
}
