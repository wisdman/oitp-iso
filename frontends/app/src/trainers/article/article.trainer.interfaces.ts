
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IArticleTrainer = "article"

export interface IArticleTrainerConfig extends ITrainerConfig {
  id: IArticleTrainer
  header: string
  body: string
  button: string
}

export interface IArticleTrainerResult extends ITrainerResult {
  config: IArticleTrainerConfig
}
