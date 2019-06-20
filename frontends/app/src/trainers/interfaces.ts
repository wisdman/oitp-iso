
import { IClassificationColorsTrainer, IClassificationColorsTrainerConfig, IClassificationColorsTrainerResult } from "./classification-colors"
import { IClassificationDefinitionsTrainer, IClassificationDefinitionsTrainerConfig, IClassificationDefinitionsTrainerResult } from "./classification-definitions"
import { IClassificationWordsTrainer, IClassificationWordsTrainerConfig, IClassificationWordsTrainerResult } from "./classification-words"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageExpressionsTrainer, IImageExpressionsTrainerConfig, IImageExpressionsTrainerResult } from "./image-expressions"
import { IImageExpressionsQuestionTrainer, IImageExpressionsQuestionTrainerConfig, IImageExpressionsQuestionTrainerResult } from "./image-expressions-question"
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
import { IWordsColumnTrainer, IWordsColumnTrainerConfig, IWordsColumnTrainerResult } from "./words-column"
import { IWordsLexisTrainer, IWordsLexisTrainerConfig, IWordsLexisTrainerResult } from "./words-lexis"
import { IWordsPairsTrainer, IWordsPairsTrainerConfig, IWordsPairsTrainerResult } from "./words-pairs"
import { IWordsQuestionCloseTrainer, IWordsQuestionCloseTrainerConfig, IWordsQuestionCloseTrainerResult } from "./words-question-close"
import { IWordsQuestionWasteTrainer, IWordsQuestionWasteTrainerConfig, IWordsQuestionWasteTrainerResult } from "./words-question-waste"

export type ITrainer = IClassificationColorsTrainer
                     | IClassificationDefinitionsTrainer
                     | IClassificationWordsTrainer
                     | IImageCarpetTrainer
                     | IImageDifferencesTrainer
                     | IImageExpressionsTrainer
                     | IImageExpressionsQuestionTrainer
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
                     | IWordsColumnTrainer
                     | IWordsLexisTrainer
                     | IWordsPairsTrainer
                     | IWordsQuestionCloseTrainer
                     | IWordsQuestionWasteTrainer


export type ITrainerConfigs = IClassificationColorsTrainerConfig
                            | IClassificationDefinitionsTrainerConfig
                            | IClassificationWordsTrainerConfig
                            | IImageCarpetTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageExpressionsTrainerConfig
                            | IImageExpressionsQuestionTrainerConfig
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
                            | IWordsColumnTrainerConfig
                            | IWordsLexisTrainerConfig
                            | IWordsPairsTrainerConfig
                            | IWordsQuestionCloseTrainerConfig
                            | IWordsQuestionWasteTrainerConfig

export type ITrainerResults = IClassificationColorsTrainerResult
                            | IClassificationDefinitionsTrainerResult
                            | IClassificationWordsTrainerResult
                            | IImageCarpetTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageExpressionsTrainerResult
                            | IImageExpressionsQuestionTrainerResult
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
                            | IWordsColumnTrainerResult
                            | IWordsLexisTrainerResult
                            | IWordsPairsTrainerResult
                            | IWordsQuestionCloseTrainerResult
                            | IWordsQuestionWasteTrainerResult

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