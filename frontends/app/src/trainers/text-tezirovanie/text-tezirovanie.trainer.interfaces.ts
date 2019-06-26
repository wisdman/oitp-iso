
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextTezirovanieTrainer = "text-tezirovanie"

export interface ITextTezirovanieTrainerConfig extends ITrainerConfig {
  ui: ITextTezirovanieTrainer

  playTimeLimit: number

  data: string
}

export interface ITextTezirovanieTrainerResult extends ITrainerResult {
  config: ITextTezirovanieTrainerConfig
  success: number
  error: number
}
