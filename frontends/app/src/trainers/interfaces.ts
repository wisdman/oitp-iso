
import { IClassificationWordsTrainer, IClassificationWordsTrainerConfig, IClassificationWordsTrainerResult } from "./classification-words"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageFieldTrainer, IImageFieldTrainerConfig, IImageFieldTrainerResult } from "./image-field"
import { IMatrixFillingTrainer, IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult } from "./matrix-filling"
import { IMatrixSequenceTrainer, IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult } from "./matrix-sequence"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IRelaxTrainer, IRelaxTrainerConfig, IRelaxTrainerResult } from "./relax"
import { ITablePipeTrainer, ITablePipeTrainerConfig, ITablePipeTrainerResult } from "./table-pipe"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextPairsTrainer, ITextPairsTrainerConfig, ITextPairsTrainerResult } from "./text-pairs"
import { ITextReadingTrainer, ITextReadingTrainerConfig, ITextReadingTrainerResult } from "./text-reading"
import { ITextSortTrainer, ITextSortTrainerConfig, ITextSortTrainerResult } from "./text-sort"
import { ITextTezirovanieTrainer, ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult } from "./text-tezirovanie"

export type ITrainer = IClassificationWordsTrainer
                     | IImageCarpetTrainer
                     | IImageDifferencesTrainer
                     | IImageFieldTrainer
                     | IMatrixFillingTrainer
                     | IMatrixSequenceTrainer
                     | IQuestionTrainer
                     | IRelaxTrainer
                     | ITablePipeTrainer
                     | ITextLettersTrainer
                     | ITextPairsTrainer
                     | ITextReadingTrainer
                     | ITextSortTrainer
                     | ITextTezirovanieTrainer


export type ITrainerConfigs = IClassificationWordsTrainerConfig
                            | IImageCarpetTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageFieldTrainerConfig
                            | IMatrixFillingTrainerConfig
                            | IMatrixSequenceTrainerConfig
                            | IQuestionTrainerConfig
                            | IRelaxTrainerConfig
                            | ITablePipeTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextPairsTrainerConfig
                            | ITextReadingTrainerConfig
                            | ITextSortTrainerConfig
                            | ITextTezirovanieTrainerConfig

export type ITrainerResults = IClassificationWordsTrainerResult
                            | IImageCarpetTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageFieldTrainerResult
                            | IMatrixFillingTrainerResult
                            | IMatrixSequenceTrainerResult
                            | IQuestionTrainerResult
                            | IRelaxTrainerResult
                            | ITablePipeTrainerResult
                            | ITextLettersTrainerResult
                            | ITextPairsTrainerResult
                            | ITextReadingTrainerResult
                            | ITextSortTrainerResult
                            | ITextTezirovanieTrainerResult

export interface ITrainerConfig {
  id: ITrainer
  uid: string
}

export interface ITrainerResult {
  id: ITrainer
  config: ITrainerConfig

  isFinish?: boolean
  isTimeout?: boolean

  time?: number
  success?: number
  error?: number
}

export interface ITraining {
  id: string
  timeLimit: number
  trainers: Array<ITrainerConfigs>
}