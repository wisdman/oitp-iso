
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextTezirovanieTrainer = "text-tezirovanie"

export interface ITextTezirovanieTrainerConfig extends ITrainerConfig {
  id: ITextTezirovanieTrainer
  header?: string
  body: string
  thesis: Array<number>
}

export interface ITextTezirovanieTrainerResult extends ITrainerResult {
  id: ITextTezirovanieTrainer
  config: ITextTezirovanieTrainerConfig
}
