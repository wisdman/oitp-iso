
import { IClassificationColorsTrainer, IClassificationColorsTrainerConfig, IClassificationColorsTrainerResult } from "./classification-colors"
import { IClassificationDefinitionsTrainer, IClassificationDefinitionsTrainerConfig, IClassificationDefinitionsTrainerResult } from "./classification-definitions"
import { IClassificationWordsTrainer, IClassificationWordsTrainerConfig, IClassificationWordsTrainerResult } from "./classification-words"
import { IGreetingTrainer, IGreetingTrainerConfig, IGreetingTrainerResult } from "./greeting"
import { IImageCarpetTrainer, IImageCarpetTrainerConfig, IImageCarpetTrainerResult } from "./image-carpet"
import { IImageDifferencesTrainer, IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult } from "./image-differences"
import { IImageExpressionsQuestionTrainer, IImageExpressionsQuestionTrainerConfig, IImageExpressionsQuestionTrainerResult } from "./image-expressions-question"
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
import { IResultTrainer, IResultTrainerConfig, IResultTrainerResult } from "./result"
import { ISpaceQuestionWasteTrainer, ISpaceQuestionWasteTrainerConfig, ISpaceQuestionWasteTrainerResult } from "./space-question-waste"
import { IStorytellingQuestionTrainer, IStorytellingQuestionTrainerConfig, IStorytellingQuestionTrainerResult } from "./storytelling-question"
import { IStorytellingTrainer, IStorytellingTrainerConfig, IStorytellingTrainerResult } from "./storytelling"
import { ITablePipeTrainer, ITablePipeTrainerConfig, ITablePipeTrainerResult } from "./table-pipe"
import { ITableWordsTrainer, ITableWordsTrainerConfig, ITableWordsTrainerResult } from "./table-words"
import { ITextLettersTrainer, ITextLettersTrainerConfig, ITextLettersTrainerResult } from "./text-letters"
import { ITextReadingQuestionTrainer, ITextReadingQuestionTrainerConfig, ITextReadingQuestionTrainerResult } from "./text-reading-question"
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
                     | IGreetingTrainer
                     | IImageCarpetTrainer
                     | IImageDifferencesTrainer
                     | IImageExpressionsQuestionTrainer
                     | IImageExpressionsTrainer
                     | IImageFieldQuestionTrainer
                     | IImageFieldTrainer
                     | IMathEquationTrainer
                     | IMathMiddleTrainer
                     | IMathSequenceTrainer
                     | IMathWasteTrainer
                     | IMatrixFillingQuestionTrainer
                     | IMatrixFillingTrainer
                     | IMatrixSequenceTrainer
                     | IRelaxTrainer
                     | IResultTrainer
                     | ISpaceQuestionWasteTrainer
                     | IStorytellingQuestionTrainer
                     | IStorytellingTrainer
                     | ITablePipeTrainer
                     | ITableWordsTrainer
                     | ITextLettersTrainer
                     | ITextReadingQuestionTrainer
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
                            | IGreetingTrainerConfig
                            | IImageCarpetTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageExpressionsQuestionTrainerConfig
                            | IImageExpressionsTrainerConfig
                            | IImageFieldQuestionTrainerConfig
                            | IImageFieldTrainerConfig
                            | IMathEquationTrainerConfig
                            | IMathMiddleTrainerConfig
                            | IMathSequenceTrainerConfig
                            | IMathWasteTrainerConfig
                            | IMatrixFillingQuestionTrainerConfig
                            | IMatrixFillingTrainerConfig
                            | IMatrixSequenceTrainerConfig
                            | IRelaxTrainerConfig
                            | IResultTrainerConfig
                            | ISpaceQuestionWasteTrainerConfig
                            | IStorytellingQuestionTrainerConfig
                            | IStorytellingTrainerConfig
                            | ITablePipeTrainerConfig
                            | ITableWordsTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextReadingQuestionTrainerConfig
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
                            | IGreetingTrainerResult
                            | IImageCarpetTrainerResult
                            | IImageDifferencesTrainerResult
                            | IImageExpressionsQuestionTrainerResult
                            | IImageExpressionsTrainerResult
                            | IImageFieldQuestionTrainerResult
                            | IImageFieldTrainerResult
                            | IMathEquationTrainerResult
                            | IMathMiddleTrainerResult
                            | IMathSequenceTrainerResult
                            | IMathWasteTrainerResult
                            | IMatrixFillingQuestionTrainerResult
                            | IMatrixFillingTrainerResult
                            | IMatrixSequenceTrainerResult
                            | IRelaxTrainerResult
                            | IResultTrainerResult
                            | ISpaceQuestionWasteTrainerResult
                            | IStorytellingQuestionTrainerResult
                            | IStorytellingTrainerResult
                            | ITablePipeTrainerResult
                            | ITableWordsTrainerResult
                            | ITextLettersTrainerResult
                            | ITextReadingQuestionTrainerResult
                            | ITextReadingTrainerResult
                            | ITextTezirovanieTrainerResult
                            | IWordsColumnTrainerResult
                            | IWordsLexisTrainerResult
                            | IWordsPairsTrainerResult
                            | IWordsQuestionCloseTrainerResult
                            | IWordsQuestionWasteTrainerResult

export interface ITrainerConfig {
  id: string
  ui: ITrainer

  uuid: string
  training: string
}

export interface ITrainerResult {
  uuid: string
  training: string

  isFinish?: boolean
  isTimeout?: boolean

  time?: number
  success?: number
  error?: number
}

export type ITrainingType = "everyday" | "once"

export interface ITraining {
  uuid: string
  timeLimit: number
  type: ITrainingType
  trainers: Array<ITrainerConfigs>
}