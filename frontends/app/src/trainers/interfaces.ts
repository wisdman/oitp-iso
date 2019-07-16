import { IClassificationColorsTrainerID, IClassificationColorsTrainerUI, IClassificationColorsTrainerConfig } from "./classification-colors"
import { IClassificationDefinitionsTrainerID, IClassificationDefinitionsTrainerUI, IClassificationDefinitionsTrainerConfig } from "./classification-definitions"
import { IClassificationWordsTrainerID, IClassificationWordsTrainerUI, IClassificationWordsTrainerConfig } from "./classification-words"
import { IGreetingTrainerID, IGreetingTrainerUI, IGreetingTrainerConfig } from "./greeting"
import { IImageCarpetsTrainerID, IImageCarpetsTrainerUI, IImageCarpetsTrainerConfig } from "./image-carpets"
import { IImageDifferencesTrainerID, IImageDifferencesTrainerUI, IImageDifferencesTrainerConfig } from "./image-differences"
import { IImageExpressionsTrainerID, IImageExpressionsTrainerUI, IImageExpressionsTrainerConfig } from "./image-expressions"
import { IImageExpressionsPreviewTrainerID, IImageExpressionsPreviewTrainerUI, IImageExpressionsPreviewTrainerConfig } from "./image-expressions-preview"
import { IImageFieldsPreviewTrainerID, IImageFieldsPreviewTrainerUI, IImageFieldsPreviewTrainerConfig } from "./image-fields-preview"
import { IImageFieldsQuestionTrainerID, IImageFieldsQuestionTrainerUI, IImageFieldsQuestionTrainerConfig } from "./image-fields-question"
import { IMathEquationTrainerID, IMathEquationTrainerUI, IMathEquationTrainerConfig } from "./math-equation"
import { IMathMiddleTrainerID, IMathMiddleTrainerUI, IMathMiddleTrainerConfig } from "./math-middle"
import { IMathSequenceTrainerID, IMathSequenceTrainerUI, IMathSequenceTrainerConfig } from "./math-sequence"
import { IMathWasteTrainerID, IMathWasteTrainerUI, IMathWasteTrainerConfig } from "./math-waste"
import { IMatrixImagesFillingTrainerID, IMatrixImagesFillingTrainerUI, IMatrixImagesFillingTrainerConfig } from "./matrix-images-filling"
import { IMatrixImagesPreviewTrainerID, IMatrixImagesPreviewTrainerUI, IMatrixImagesPreviewTrainerConfig } from "./matrix-images-preview"
import { IMatrixImagesQuestionTrainerID, IMatrixImagesQuestionTrainerUI, IMatrixImagesQuestionTrainerConfig } from "./matrix-images-question"
import { IMatrixSequenceFillingTrainerID, IMatrixSequenceFillingTrainerUI, IMatrixSequenceFillingTrainerConfig } from "./matrix-sequence-filling"
import { IMatrixSequencePlayTrainerID, IMatrixSequencePlayTrainerUI, IMatrixSequencePlayTrainerConfig } from "./matrix-sequence-play"
import { IRelaxTrainerID, IRelaxTrainerUI, IRelaxTrainerConfig } from "./relax"
import { IResultTrainerID, IResultTrainerUI, IResultTrainerConfig } from "./result"
import { ISpaceQuestionWasteTrainerID, ISpaceQuestionWasteTrainerUI, ISpaceQuestionWasteTrainerConfig } from "./space-question-waste"
import { IStorytellingTrainerID, IStorytellingTrainerUI, IStorytellingTrainerConfig } from "./storytelling"
import { ITablePipeTrainerID, ITablePipeTrainerUI, ITablePipeTrainerConfig } from "./table-pipe"
import { ITextLettersTrainerID, ITextLettersTrainerUI, ITextLettersTrainerConfig } from "./text-letters"
import { ITextLettersPreviewTrainerID, ITextLettersPreviewTrainerUI, ITextLettersPreviewTrainerConfig } from "./text-letters-preview"
import { ITextQuestionToFTrainerID, ITextQuestionToFTrainerUI, ITextQuestionToFTrainerConfig } from "./text-question-tof"
import { ITextReadingTrainerID, ITextReadingTrainerUI, ITextReadingTrainerConfig } from "./text-reading"
import { ITextTezirovanieTrainerID, ITextTezirovanieTrainerUI, ITextTezirovanieTrainerConfig } from "./text-tezirovanie"
import { IWordsColumnTrainerID, IWordsColumnTrainerUI, IWordsColumnTrainerConfig } from "./words-column"
import { IWordsFillingTrainerID, IWordsFillingTrainerUI, IWordsFillingTrainerConfig } from "./words-filling"
import { IWordsLexisTrainerID, IWordsLexisTrainerUI, IWordsLexisTrainerConfig } from "./words-lexis"
import { IWordsPairsTrainerID, IWordsPairsTrainerUI, IWordsPairsTrainerConfig } from "./words-pairs"
import { IWordsQuestionsCloseTrainerID, IWordsQuestionsCloseTrainerUI, IWordsQuestionsCloseTrainerConfig } from "./words-questions-close"
import { IWordsQuestionsWasteTrainerID, IWordsQuestionsWasteTrainerUI, IWordsQuestionsWasteTrainerConfig } from "./words-questions-waste"

export type ITrainerID = IClassificationColorsTrainerID
                       | IClassificationDefinitionsTrainerID
                       | IClassificationWordsTrainerID
                       | IGreetingTrainerID
                       | IImageCarpetsTrainerID
                       | IImageDifferencesTrainerID
                       | IImageExpressionsTrainerID
                       | IImageExpressionsPreviewTrainerID
                       | IImageFieldsPreviewTrainerID
                       | IImageFieldsQuestionTrainerID
                       | IMathEquationTrainerID
                       | IMathMiddleTrainerID
                       | IMathSequenceTrainerID
                       | IMathWasteTrainerID
                       | IMatrixImagesFillingTrainerID
                       | IMatrixImagesPreviewTrainerID
                       | IMatrixImagesQuestionTrainerID
                       | IMatrixSequenceFillingTrainerID
                       | IMatrixSequencePlayTrainerID
                       | IRelaxTrainerID
                       | IResultTrainerID
                       | ISpaceQuestionWasteTrainerID
                       | IStorytellingTrainerID
                       | ITablePipeTrainerID
                       | ITextLettersTrainerID
                       | ITextLettersPreviewTrainerID
                       | ITextQuestionToFTrainerID
                       | ITextReadingTrainerID
                       | ITextTezirovanieTrainerID
                       | IWordsColumnTrainerID
                       | IWordsFillingTrainerID
                       | IWordsLexisTrainerID
                       | IWordsPairsTrainerID
                       | IWordsQuestionsCloseTrainerID
                       | IWordsQuestionsWasteTrainerID

export type ITrainerUI = IClassificationColorsTrainerUI
                       | IClassificationDefinitionsTrainerUI
                       | IClassificationWordsTrainerUI
                       | IGreetingTrainerUI
                       | IImageCarpetsTrainerUI
                       | IImageDifferencesTrainerUI
                       | IImageExpressionsTrainerUI
                       | IImageExpressionsPreviewTrainerUI
                       | IImageFieldsPreviewTrainerUI
                       | IImageFieldsQuestionTrainerUI
                       | IMathEquationTrainerUI
                       | IMathMiddleTrainerUI
                       | IMathSequenceTrainerUI
                       | IMathWasteTrainerUI
                       | IMatrixImagesFillingTrainerUI
                       | IMatrixImagesPreviewTrainerUI
                       | IMatrixImagesQuestionTrainerUI
                       | IMatrixSequenceFillingTrainerUI
                       | IMatrixSequencePlayTrainerUI
                       | IRelaxTrainerUI
                       | IResultTrainerUI
                       | ISpaceQuestionWasteTrainerUI
                       | IStorytellingTrainerUI
                       | ITablePipeTrainerUI
                       | ITextLettersTrainerUI
                       | ITextLettersPreviewTrainerUI
                       | ITextQuestionToFTrainerUI
                       | ITextReadingTrainerUI
                       | ITextTezirovanieTrainerUI
                       | IWordsColumnTrainerUI
                       | IWordsFillingTrainerUI
                       | IWordsLexisTrainerUI
                       | IWordsPairsTrainerUI
                       | IWordsQuestionsCloseTrainerUI
                       | IWordsQuestionsWasteTrainerUI


export type ITrainerConfigs = IClassificationColorsTrainerConfig
                            | IClassificationDefinitionsTrainerConfig
                            | IClassificationWordsTrainerConfig
                            | IGreetingTrainerConfig
                            | IImageCarpetsTrainerConfig
                            | IImageDifferencesTrainerConfig
                            | IImageExpressionsTrainerConfig
                            | IImageExpressionsPreviewTrainerConfig
                            | IImageFieldsPreviewTrainerConfig
                            | IImageFieldsQuestionTrainerConfig
                            | IMathEquationTrainerConfig
                            | IMathMiddleTrainerConfig
                            | IMathSequenceTrainerConfig
                            | IMathWasteTrainerConfig
                            | IMatrixImagesFillingTrainerConfig
                            | IMatrixImagesPreviewTrainerConfig
                            | IMatrixImagesQuestionTrainerConfig
                            | IMatrixSequenceFillingTrainerConfig
                            | IMatrixSequencePlayTrainerConfig
                            | IRelaxTrainerConfig
                            | IResultTrainerConfig
                            | ISpaceQuestionWasteTrainerConfig
                            | IStorytellingTrainerConfig
                            | ITablePipeTrainerConfig
                            | ITextLettersTrainerConfig
                            | ITextLettersPreviewTrainerConfig
                            | ITextQuestionToFTrainerConfig
                            | ITextReadingTrainerConfig
                            | ITextTezirovanieTrainerConfig
                            | IWordsColumnTrainerConfig
                            | IWordsFillingTrainerConfig
                            | IWordsLexisTrainerConfig
                            | IWordsPairsTrainerConfig
                            | IWordsQuestionsCloseTrainerConfig
                            | IWordsQuestionsWasteTrainerConfig

export interface ITrainerConfig {
  id: ITrainerID
  ui: ITrainerUI

  timeLimit: number

  training: string
  idx: number
}

export interface ITrainerResult {
  training: string
  idx: number

  isFinish?: boolean
  isTimeout?: boolean

  result: number | null
  time: number
}

export type ITrainingType = "debug" | "everyday" | "once"

export interface ITraining {
  id: string
  type: ITrainingType

  timeLimit: number

  trainers: Array<ITrainerConfigs>
}