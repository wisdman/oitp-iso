
import { IClassificationColorsTrainer, IClassificationColorsTrainerConfig, IClassificationColorsTrainerResult } from "./classification-colors"
import { IClassificationDefinitionsTrainer, IClassificationDefinitionsTrainerConfig, IClassificationDefinitionsTrainerResult } from "./classification-definitions"
import { IClassificationWordsTrainer, IClassificationWordsTrainerConfig, IClassificationWordsTrainerResult } from "./classification-words"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageExpressionsTrainer, IImageExpressionsTrainerConfig, IImageExpressionsTrainerResult } from "./image-expressions"
import { IImageFieldQuestionTrainer, IImageFieldQuestionTrainerConfig, IImageFieldQuestionTrainerResult } from "./image-field-question"
import { IImageFieldTrainer, IImageFieldTrainerConfig, IImageFieldTrainerResult } from "./image-field"
import { IMathEquationTrainer, IMathEquationTrainerConfig, IMathEquationTrainerResult } from "./math-equation"
import { IMathMiddleTrainer, IMathMiddleTrainerConfig, IMathMiddleTrainerResult } from "./math-middle"
import { IMathSequenceTrainer, IMathSequenceTrainerConfig, IMathSequenceTrainerResult } from "./math-sequence"
import { IMathWasteTrainer, IMathWasteTrainerConfig, IMathWasteTrainerResult } from "./math-waste"
import { IMatrixFillingQuestionTrainer, IMatrixFillingQuestionTrainerConfig, IMatrixFillingQuestionTrainerResult } from "./matrix-filling-question"
import { IMatrixFillingTrainer, IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult } from "./matrix-filling"
import { IMatrixSequenceTrainer, IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult } from "./matrix-sequence"
import { IRelaxTrainer, IRelaxTrainerConfig, IRelaxTrainerResult } from "./relax"
import { ITablePipeTrainer, ITablePipeTrainerConfig, ITablePipeTrainerResult } from "./table-pipe"
import { ITableWordsTrainer, ITableWordsTrainerConfig, ITableWordsTrainerResult } from "./table-words"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextQuestionTrainer, ITextQuestionTrainerConfig, ITextQuestionTrainerResult } from "./text-question"
import { ITextReadingTrainer, ITextReadingTrainerConfig, ITextReadingTrainerResult } from "./text-reading"
import { ITextTezirovanieTrainer, ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult } from "./text-tezirovanie"
import { IWordsColumnsTrainer, IWordsColumnsTrainerConfig, IWordsColumnsTrainerResult } from "./words-columns"
import { IWordsPairsTrainer, IWordsPairsTrainerConfig, IWordsPairsTrainerResult } from "./words-pairs"

export type ITrainer = IClassificationColorsTrainer
                     | IClassificationDefinitionsTrainer
                     | IClassificationWordsTrainer
                     | IImageCarpetTrainer
                     | IImageDifferencesTrainer
                     | IImageExpressionsTrainer
                     | IImageFieldTrainer
                     | IImageFieldQuestionTrainer
                     | IMathEquationTrainer
                     | IMathMiddleTrainer
                     | IMathSequenceTrainer
                     | IMathWasteTrainer
                     | IMatrixFillingTrainer
                     | IMatrixFillingQuestionTrainer
                     | IMatrixSequenceTrainer
                     | IRelaxTrainer
                     | ITablePipeTrainer
                     | ITableWordsTrainer
                     | ITextLettersTrainer
                     | ITextQuestionTrainer
                     | ITextReadingTrainer
                     | ITextTezirovanieTrainer
                     | IWordsColumnsTrainer
                     | IWordsPairsTrainer


export type ITrainerConfigs = IClassificationColorsTrainerConfig
                            | IClassificationDefinitionsTrainerConfig
                            | IClassificationWordsTrainerConfig
                            | IImageCarpetTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageExpressionsTrainerConfig
                            | IImageFieldTrainerConfig
                            | IImageFieldQuestionTrainerConfig
                            | IMathEquationTrainerConfig
                            | IMathMiddleTrainerConfig
                            | IMathSequenceTrainerConfig
                            | IMathWasteTrainerConfig
                            | IMatrixFillingTrainerConfig
                            | IMatrixFillingQuestionTrainerConfig
                            | IMatrixSequenceTrainerConfig
                            | IRelaxTrainerConfig
                            | ITablePipeTrainerConfig
                            | ITableWordsTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextQuestionTrainerConfig
                            | ITextReadingTrainerConfig
                            | ITextTezirovanieTrainerConfig
                            | IWordsColumnsTrainerConfig
                            | IWordsPairsTrainerConfig

export type ITrainerResults = IClassificationColorsTrainerResult
                            | IClassificationDefinitionsTrainerResult
                            | IClassificationWordsTrainerResult
                            | IImageCarpetTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageExpressionsTrainerResult
                            | IImageFieldTrainerResult
                            | IImageFieldQuestionTrainerResult
                            | IMathEquationTrainerResult
                            | IMathMiddleTrainerResult
                            | IMathSequenceTrainerResult
                            | IMathWasteTrainerResult
                            | IMatrixFillingTrainerResult
                            | IMatrixFillingQuestionTrainerResult
                            | IMatrixSequenceTrainerResult
                            | IRelaxTrainerResult
                            | ITablePipeTrainerResult
                            | ITableWordsTrainerResult
                            | ITextLettersTrainerResult
                            | ITextQuestionTrainerResult
                            | ITextReadingTrainerResult
                            | ITextTezirovanieTrainerResult
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