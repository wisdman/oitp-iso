
import { IClassificationColorsTrainer, IClassificationColorsTrainerConfig, IClassificationColorsTrainerResult } from "./classification-colors"
import { IClassificationDefinitionsTrainer, IClassificationDefinitionsTrainerConfig, IClassificationDefinitionsTrainerResult } from "./classification-definitions"
import { IClassificationWordsTrainer, IClassificationWordsTrainerConfig, IClassificationWordsTrainerResult } from "./classification-words"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageExpressionsTrainer, IImageExpressionsTrainerConfig, IImageExpressionsTrainerResult } from "./image-expressions"
import { IImageFieldTrainer, IImageFieldTrainerConfig, IImageFieldTrainerResult } from "./image-field"
import { IMathEquationTrainer, IMathEquationTrainerConfig, IMathEquationTrainerResult } from "./math-equation"

import { IMathMiddleTrainer, IMathMiddleTrainerConfig, IMathMiddleTrainerResult } from "./math-middle"
import { IMathSequenceTrainer, IMathSequenceTrainerConfig, IMathSequenceTrainerResult } from "./math-sequence"
import { IMathWasteTrainer, IMathWasteTrainerConfig, IMathWasteTrainerResult } from "./math-waste"

import { IMatrixFillingTrainer, IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult } from "./matrix-filling"
import { IMatrixSequenceTrainer, IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult } from "./matrix-sequence"
import { IQuestionTrainer, IQuestionTrainerConfig, IQuestionTrainerResult } from "./question"
import { IRelaxTrainer, IRelaxTrainerConfig, IRelaxTrainerResult } from "./relax"
import { ITablePipeTrainer, ITablePipeTrainerConfig, ITablePipeTrainerResult } from "./table-pipe"
import { ITableWordsTrainer, ITableWordsTrainerConfig, ITableWordsTrainerResult } from "./table-words"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextReadingTrainer, ITextReadingTrainerConfig, ITextReadingTrainerResult } from "./text-reading"
import { IWordsColumnsTrainer, IWordsColumnsTrainerConfig, IWordsColumnsTrainerResult } from "./words-columns"
import { IWordsPairsTrainer, IWordsPairsTrainerConfig, IWordsPairsTrainerResult } from "./words-pairs"

export type ITrainer = IClassificationColorsTrainer
                     | IClassificationDefinitionsTrainer
                     | IClassificationWordsTrainer
                     | IImageCarpetTrainer
                     | IImageDifferencesTrainer
                     | IImageExpressionsTrainer
                     | IImageFieldTrainer
                     | IMathEquationTrainer
                     | IMathMiddleTrainer
                     | IMathSequenceTrainer
                     | IMathWasteTrainer
                     | IMatrixFillingTrainer
                     | IMatrixSequenceTrainer
                     | IQuestionTrainer
                     | IRelaxTrainer
                     | ITablePipeTrainer
                     | ITableWordsTrainer
                     | ITextLettersTrainer
                     | ITextReadingTrainer
                     | IWordsColumnsTrainer
                     | IWordsPairsTrainer


export type ITrainerConfigs = IClassificationColorsTrainerConfig
                            | IClassificationDefinitionsTrainerConfig
                            | IClassificationWordsTrainerConfig
                            | IImageCarpetTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageExpressionsTrainerConfig
                            | IImageFieldTrainerConfig
                            | IMathEquationTrainerConfig
                            | IMathMiddleTrainerConfig
                            | IMathSequenceTrainerConfig
                            | IMathWasteTrainerConfig
                            | IMatrixFillingTrainerConfig
                            | IMatrixSequenceTrainerConfig
                            | IQuestionTrainerConfig
                            | IRelaxTrainerConfig
                            | ITablePipeTrainerConfig
                            | ITableWordsTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextReadingTrainerConfig
                            | IWordsColumnsTrainerConfig
                            | IWordsPairsTrainerConfig

export type ITrainerResults = IClassificationColorsTrainerResult
                            | IClassificationDefinitionsTrainerResult
                            | IClassificationWordsTrainerResult
                            | IImageCarpetTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageExpressionsTrainerResult
                            | IImageFieldTrainerResult
                            | IMathEquationTrainerResult
                            | IMathMiddleTrainerResult
                            | IMathSequenceTrainerResult
                            | IMathWasteTrainerResult
                            | IMatrixFillingTrainerResult
                            | IMatrixSequenceTrainerResult
                            | IQuestionTrainerResult
                            | IRelaxTrainerResult
                            | ITablePipeTrainerResult
                            | ITableWordsTrainerResult
                            | ITextLettersTrainerResult
                            | ITextReadingTrainerResult
                            | IWordsColumnsTrainerResult
                            | IWordsPairsTrainerResult

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