
import { ITablePipeTrainer, ITablePipeTrainerConfig, ITablePipeTrainerResult } from "./table-pipe"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageFieldTrainer, IImageFieldTrainerConfig, IImageFieldTrainerResult } from "./image-field"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { ITextPairsTrainer, ITextPairsTrainerConfig, ITextPairsTrainerResult } from "./text-pairs"
import { ITextTezirovanieTrainer, ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult } from "./text-tezirovanie"
import { IMatrixFillingTrainer, IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult } from "./matrix-filling"
import { IMatrixSequenceTrainer, IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult } from "./matrix-sequence"
import { IClassificationTrainer, IClassificationTrainerConfig, IClassificationTrainerResult } from "./classification"
import { IRelaxTrainer, IRelaxTrainerConfig, IRelaxTrainerResult } from "./relax"
import { ITextSortTrainer, ITextSortTrainerConfig, ITextSortTrainerResult } from "./text-sort"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextReadingTrainer, ITextReadingTrainerConfig, ITextReadingTrainerResult } from "./text-reading"

export type ITrainer = IClassificationTrainer
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


export type ITrainerConfigs = IClassificationTrainerConfig
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

export type ITrainerResults = IClassificationTrainerResult
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

  title?: string

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

export interface IGameFieldSize {
  width: number
  height: number
}

export interface ITraining {
  id: string
  timeLimit: number
  trainers: Array<ITrainerConfigs>
}