
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IStorytellingTrainer = "storytelling"

export interface IStorytellingTrainerConfig extends ITrainerConfig {
  ui: IStorytellingTrainer
  image: number
  audio: number
}

export interface IStorytellingTrainerResult extends ITrainerResult {
  config: IStorytellingTrainerConfig
  success: number
  error: number
}
