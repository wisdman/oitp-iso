
import { IСolorsСlassificationTrainer, IСolorsСlassificationTrainerConfig, IСolorsСlassificationTrainerResult } from "./colors-classification"
import { IImageCanvasTrainer, IImageCanvasTrainerConfig, IImageCanvasTrainerResult } from "./image-canvas"
import { IImageClassificationTrainer, IImageClassificationTrainerConfig, IImageClassificationTrainerResult } from "./image-classification"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageFieldTrainer, IImageFieldTrainerConfig, IImageFieldTrainerResult } from "./image-field"
import { IImageSequenceTrainer, IImageSequenceTrainerConfig, IImageSequenceTrainerResult } from "./image-sequence"
import { IImageTableTrainer, IImageTableTrainerConfig, IImageTableTrainerResult } from "./image-table"
import { IMessageTrainer, IMessageTrainerConfig, IMessageTrainerResult } from "./message"
import { INumberExclusionTrainer, INumberExclusionTrainerConfig, INumberExclusionTrainerResult } from "./number-exclusion"
import { INumberExpressionTrainer, INumberExpressionTrainerConfig, INumberExpressionTrainerResult } from "./number-expression"
import { INumberSeriesTrainer, INumberSeriesTrainerConfig, INumberSeriesTrainerResult } from "./number-series"
import { INumberShapeTrainer, INumberShapeTrainerConfig, INumberShapeTrainerResult } from "./number-shape"
import { INumberTableTrainer, INumberTableTrainerConfig, INumberTableTrainerResult } from "./number-table"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IResultTrainer, IResultTrainerConfig, IResultTrainerResult } from "./result"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextTezirovanieTrainer, ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult } from "./text-tezirovanie"
import { IWordsClassificationTrainer, IWordsClassificationTrainerConfig, IWordsClassificationTrainerResult } from "./words-classification"
import { IWordsExclusionTrainer, IWordsExclusionTrainerConfig, IWordsExclusionTrainerResult } from "./words-exclusion"
import { IWordsPairsTrainer, IWordsPairsTrainerConfig, IWordsPairsTrainerResult } from "./words-pairs"
import { IWordsShapeTrainer, IWordsShapeTrainerConfig, IWordsShapeTrainerResult } from "./words-shape"

export type ITrainer = IСolorsСlassificationTrainer
                     | IImageCanvasTrainer
                     | IImageClassificationTrainer
                     | IImageDifferencesTrainer
                     | IImageFieldTrainer
                     | IImageSequenceTrainer
                     | IImageTableTrainer
                     | IMessageTrainer
                     | INumberExclusionTrainer
                     | INumberExpressionTrainer
                     | INumberSeriesTrainer
                     | INumberShapeTrainer
                     | INumberTableTrainer
                     | IQuestionTrainer
                     | IResultTrainer
                     | ITextLettersTrainer
                     | ITextTezirovanieTrainer
                     | IWordsClassificationTrainer
                     | IWordsExclusionTrainer
                     | IWordsPairsTrainer
                     | IWordsShapeTrainer

export type ITrainerConfigs = IСolorsСlassificationTrainerConfig
                            | IImageCanvasTrainerConfig
                            | IImageClassificationTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageFieldTrainerConfig
                            | IImageSequenceTrainerConfig
                            | IImageTableTrainerConfig
                            | IMessageTrainerConfig
                            | INumberExclusionTrainerConfig
                            | INumberExpressionTrainerConfig
                            | INumberSeriesTrainerConfig
                            | INumberShapeTrainerConfig
                            | INumberTableTrainerConfig
                            | IQuestionTrainerConfig
                            | IResultTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextTezirovanieTrainerConfig
                            | IWordsClassificationTrainerConfig
                            | IWordsExclusionTrainerConfig
                            | IWordsPairsTrainerConfig
                            | IWordsShapeTrainerConfig

export type ITrainerResults = IСolorsСlassificationTrainerResult
                            | IImageCanvasTrainerResult
                            | IImageClassificationTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageFieldTrainerResult
                            | IImageSequenceTrainerResult
                            | IImageTableTrainerResult
                            | IMessageTrainerResult
                            | INumberExclusionTrainerResult
                            | INumberExpressionTrainerResult
                            | INumberSeriesTrainerResult
                            | INumberShapeTrainerResult
                            | INumberTableTrainerResult
                            | IQuestionTrainerResult
                            | IResultTrainerResult
                            | ITextLettersTrainerResult
                            | ITextTezirovanieTrainerResult
                            | IWordsClassificationTrainerResult
                            | IWordsExclusionTrainerResult
                            | IWordsPairsTrainerResult
                            | IWordsShapeTrainerResult

export interface ITrainerConfig {
  id: ITrainer
  uid: string

  timeLimit?: number
  isGameMode?: boolean

  globalTimeLimit?: number
}

export interface ITrainerResult {
  id: ITrainer
  config: ITrainerConfig

  isFinish?: boolean

  time?: number
  isTimeout?: boolean

  success?: number
  error?: number
}
