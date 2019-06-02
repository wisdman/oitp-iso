import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageFieldTrainer = "image-field"

export interface IImageFieldTrainerConfig extends ITrainerConfig {
  id: IImageFieldTrainer

  items: Array<number>
  pages: Array<Array<number>>
  answers: Array<{
    icon: number,
    correct: boolean,
  }>

  pageTimeLimit: number
  playTimeLimit: number
}

export interface IImageFieldTrainerResult extends ITrainerResult {
  config: IImageFieldTrainerConfig
}