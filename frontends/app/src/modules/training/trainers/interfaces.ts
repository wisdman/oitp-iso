import {IClassificationColorsID, IClassificationColorsUI, IClassificationColorsConfig} from "./classification-colors"
import {IClassificationDefinitionsID, IClassificationDefinitionsUI, IClassificationDefinitionsConfig} from "./classification-definitions"
import {IClassificationWordsID, IClassificationWordsUI, IClassificationWordsConfig} from "./classification-words"
import {IGreetingID, IGreetingUI, IGreetingConfig} from "./greeting"
import {IImageCarpetsID, IImageCarpetsUI, IImageCarpetsConfig} from "./image-carpets"
import {IImageDifferencesID, IImageDifferencesUI, IImageDifferencesConfig} from "./image-differences"
import {IImageExpressionsID, IImageExpressionsUI, IImageExpressionsConfig} from "./image-expressions"
import {IImageExpressionsPreviewID, IImageExpressionsPreviewUI, IImageExpressionsPreviewConfig} from "./image-expressions-preview"
import {IImageFieldsPreviewID, IImageFieldsPreviewUI, IImageFieldsPreviewConfig} from "./image-fields-preview"
import {IImageFieldsQuestionID, IImageFieldsQuestionUI, IImageFieldsQuestionConfig} from "./image-fields-question"
import {IMathEquationID, IMathEquationUI, IMathEquationConfig} from "./math-equation"
import {IMathMiddleID, IMathMiddleUI, IMathMiddleConfig} from "./math-middle"
import {IMathSequenceID, IMathSequenceUI, IMathSequenceConfig} from "./math-sequence"
import {IMathWasteID, IMathWasteUI, IMathWasteConfig} from "./math-waste"
import {IMatrixImagesFillingID, IMatrixImagesFillingUI, IMatrixImagesFillingConfig} from "./matrix-images-filling"
import {IMatrixImagesPreviewID, IMatrixImagesPreviewUI, IMatrixImagesPreviewConfig} from "./matrix-images-preview"
import {IMatrixImagesQuestionID, IMatrixImagesQuestionUI, IMatrixImagesQuestionConfig} from "./matrix-images-question"
import {IMatrixSequenceFillingID, IMatrixSequenceFillingUI, IMatrixSequenceFillingConfig} from "./matrix-sequence-filling"
import {IMatrixSequencePlayID, IMatrixSequencePlayUI, IMatrixSequencePlayConfig} from "./matrix-sequence-play"
import {IRelaxID, IRelaxUI, IRelaxConfig} from "./relax"
import {IResultID, IResultUI, IResultConfig} from "./result"
import {ISpaceQuestionWasteID, ISpaceQuestionWasteUI, ISpaceQuestionWasteConfig} from "./space-question-waste"
import {IStorytellingID, IStorytellingUI, IStorytellingConfig} from "./storytelling"
import {ITablePipeID, ITablePipeUI, ITablePipeConfig} from "./table-pipe"
import {ITextLettersID, ITextLettersUI, ITextLettersConfig} from "./text-letters"
import {ITextLettersPreviewID, ITextLettersPreviewUI, ITextLettersPreviewConfig} from "./text-letters-preview"
import {ITextQuestionToFID, ITextQuestionToFUI, ITextQuestionToFConfig} from "./text-question-tof"
import {ITextReadingID, ITextReadingUI, ITextReadingConfig} from "./text-reading"
import {ITextTezirovanieID, ITextTezirovanieUI, ITextTezirovanieConfig} from "./text-tezirovanie"
import {IWordsColumnID, IWordsColumnUI, IWordsColumnConfig} from "./words-column"
import {IWordsFillingID, IWordsFillingUI, IWordsFillingConfig} from "./words-filling"
import {IWordsLexisID, IWordsLexisUI, IWordsLexisConfig} from "./words-lexis"
import {IWordsPairsID, IWordsPairsUI, IWordsPairsConfig} from "./words-pairs"
import {IWordsQuestionsCloseID, IWordsQuestionsCloseUI, IWordsQuestionsCloseConfig} from "./words-questions-close"
import {IWordsQuestionsWasteID, IWordsQuestionsWasteUI, IWordsQuestionsWasteConfig} from "./words-questions-waste"

export type ITrainerID = IClassificationColorsID
                       | IClassificationDefinitionsID
                       | IClassificationWordsID
                       | IGreetingID
                       | IImageCarpetsID
                       | IImageDifferencesID
                       | IImageExpressionsID
                       | IImageExpressionsPreviewID
                       | IImageFieldsPreviewID
                       | IImageFieldsQuestionID
                       | IMathEquationID
                       | IMathMiddleID
                       | IMathSequenceID
                       | IMathWasteID
                       | IMatrixImagesFillingID
                       | IMatrixImagesPreviewID
                       | IMatrixImagesQuestionID
                       | IMatrixSequenceFillingID
                       | IMatrixSequencePlayID
                       | IRelaxID
                       | IResultID
                       | ISpaceQuestionWasteID
                       | IStorytellingID
                       | ITablePipeID
                       | ITextLettersID
                       | ITextLettersPreviewID
                       | ITextQuestionToFID
                       | ITextReadingID
                       | ITextTezirovanieID
                       | IWordsColumnID
                       | IWordsFillingID
                       | IWordsLexisID
                       | IWordsPairsID
                       | IWordsQuestionsCloseID
                       | IWordsQuestionsWasteID

export type ITrainerUI = IClassificationColorsUI
                       | IClassificationDefinitionsUI
                       | IClassificationWordsUI
                       | IGreetingUI
                       | IImageCarpetsUI
                       | IImageDifferencesUI
                       | IImageExpressionsUI
                       | IImageExpressionsPreviewUI
                       | IImageFieldsPreviewUI
                       | IImageFieldsQuestionUI
                       | IMathEquationUI
                       | IMathMiddleUI
                       | IMathSequenceUI
                       | IMathWasteUI
                       | IMatrixImagesFillingUI
                       | IMatrixImagesPreviewUI
                       | IMatrixImagesQuestionUI
                       | IMatrixSequenceFillingUI
                       | IMatrixSequencePlayUI
                       | IRelaxUI
                       | IResultUI
                       | ISpaceQuestionWasteUI
                       | IStorytellingUI
                       | ITablePipeUI
                       | ITextLettersUI
                       | ITextLettersPreviewUI
                       | ITextQuestionToFUI
                       | ITextReadingUI
                       | ITextTezirovanieUI
                       | IWordsColumnUI
                       | IWordsFillingUI
                       | IWordsLexisUI
                       | IWordsPairsUI
                       | IWordsQuestionsCloseUI
                       | IWordsQuestionsWasteUI


export type ITrainerConfigs = IClassificationColorsConfig
                            | IClassificationDefinitionsConfig
                            | IClassificationWordsConfig
                            | IGreetingConfig
                            | IImageCarpetsConfig
                            | IImageDifferencesConfig
                            | IImageExpressionsConfig
                            | IImageExpressionsPreviewConfig
                            | IImageFieldsPreviewConfig
                            | IImageFieldsQuestionConfig
                            | IMathEquationConfig
                            | IMathMiddleConfig
                            | IMathSequenceConfig
                            | IMathWasteConfig
                            | IMatrixImagesFillingConfig
                            | IMatrixImagesPreviewConfig
                            | IMatrixImagesQuestionConfig
                            | IMatrixSequenceFillingConfig
                            | IMatrixSequencePlayConfig
                            | IRelaxConfig
                            | IResultConfig
                            | ISpaceQuestionWasteConfig
                            | IStorytellingConfig
                            | ITablePipeConfig
                            | ITextLettersConfig
                            | ITextLettersPreviewConfig
                            | ITextQuestionToFConfig
                            | ITextReadingConfig
                            | ITextTezirovanieConfig
                            | IWordsColumnConfig
                            | IWordsFillingConfig
                            | IWordsLexisConfig
                            | IWordsPairsConfig
                            | IWordsQuestionsCloseConfig
                            | IWordsQuestionsWasteConfig

export interface ITrainerConfig {
  training: string
  idx: number

  id: ITrainerID
  ui: ITrainerUI

  complexity: number
  playTimeLimit: number
  previewTimeLimit: number
}

export interface ITrainerResult {
  training: string
  idx: number

  result: number | null

  playTime: number
  previewTime: number
}

export type ITrainerMode = "init" | "preview" | "play" | "result"

export type ITrainingType = "debug" | "everyday" | "once"

export interface ITraining {
  id: string
  type: ITrainingType
  timeLimit: number
  trainers: Array<ITrainerConfigs>
}