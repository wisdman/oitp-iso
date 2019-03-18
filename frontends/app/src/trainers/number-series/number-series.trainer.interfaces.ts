
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberSeriesTrainer = "number-series"

export interface INumberSeriesTrainerConfig extends ITrainerConfig {
  id: INumberSeriesTrainer
  items: Array<number>
}

export interface INumberSeriesTrainerResult extends ITrainerResult {
  id: INumberSeriesTrainer
  config: INumberSeriesTrainerConfig
}
