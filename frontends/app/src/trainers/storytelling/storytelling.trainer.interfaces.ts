
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IStorytellingTrainer = "storytelling"

export interface IStorytellingTrainerConfig extends ITrainerConfig {
  id: IStorytellingTrainer
  image: number
  audio: number
}

export interface IStorytellingTrainerResult extends ITrainerResult {
  id: IStorytellingTrainer
  config: IStorytellingTrainerConfig
  success: number
  error: number
}
