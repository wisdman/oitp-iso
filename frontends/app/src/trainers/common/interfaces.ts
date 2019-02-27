
import {
  IIconsTable
} from "../"

export type ITrainer = IIconsTable | "null"

export interface IImage {
  id: number
  data?: string
  background?: string
}

export interface IСell<T> {
  value: T
  success?: boolean
  error?: boolean
}

export interface IConfig<T extends ITrainer> {
  id: T
  timeLimit: number
}

export type TTrainingConfig = Array<IConfig<ITrainer>>

export interface IStep {
  time: number
}

export interface IResult<T extends ITrainer> {
  id: T
  config: IConfig<T>

  time: number
  success: number
  error: number

  isTimeout: boolean

  steps: Array<IStep>
}