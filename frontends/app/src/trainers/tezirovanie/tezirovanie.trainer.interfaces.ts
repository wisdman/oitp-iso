
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITezirovanieTrainer = "tezirovanie"

export interface ITezirovanieTrainerConfig extends ITrainerConfig {
  id: ITezirovanieTrainer
  header: string
  body: string
}

export interface ITezirovanieTrainerResult extends ITrainerResult {
  config: ITezirovanieTrainerConfig
}
