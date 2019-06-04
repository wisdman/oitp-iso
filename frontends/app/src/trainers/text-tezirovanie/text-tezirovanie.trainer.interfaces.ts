
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextTezirovanieTrainer = "text-tezirovanie"

export interface ITextTezirovanieTrainerConfig extends ITrainerConfig {
  id: ITextTezirovanieTrainer

  playTimeLimit: number

  data: string
}

export interface ITextTezirovanieTrainerResult extends ITrainerResult {
  id: ITextTezirovanieTrainer
  config: ITextTezirovanieTrainerConfig
  success: number
  error: number
}
