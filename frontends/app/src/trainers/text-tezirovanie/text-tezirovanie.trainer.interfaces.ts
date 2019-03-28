
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextTezirovanieTrainer = "text-tezirovanie"

export interface ITextTezirovanieTrainerConfig extends ITrainerConfig {
  id: ITextTezirovanieTrainer
  mode: "show" | "play"
  body: string
}

export interface ITextTezirovanieTrainerResult extends ITrainerResult {
  id: ITextTezirovanieTrainer
  config: ITextTezirovanieTrainerConfig
  success: number
  error: number
}
