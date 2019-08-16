import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

import { AppCommonModule } from "../common"
import { WFormsModule } from "../w-forms"

import {
  TimerGlobalComponent,
  TimerLapComponent,
  TrainerSelectorComponent,
} from "./components"

import {
  ButtonDirective,
  InputDirective,
  TezirovanieDirective,
} from "./directives"

import {
  TrainingLayout,
} from "./layouts"

import {
  TimerPipe
} from "./pipes"

import {
  FullscreenService,
  KeypadService,
  PointerService,
  TimerService,
  TrainingService,
} from "./services"

import {
  AbstractTrainer,
  ClassificationColorsTrainer,
  ClassificationDefinitionsTrainer,
  ClassificationWordsTrainer,
  GreetingTrainer,
  ImageCarpetsTrainer,
  ImageDifferencesTrainer,
  ImageExpressionsPreviewTrainer,
  ImageExpressionsTrainer,
  ImageFieldsPreviewTrainer,
  ImageFieldsQuestionTrainer,
  MathEquationTrainer,
  MathMiddleTrainer,
  MathSequenceTrainer,
  MathWasteTrainer,
  MatrixImagesFillingTrainer,
  MatrixImagesPreviewTrainer,
  MatrixImagesQuestionTrainer,
  MatrixSequenceFillingTrainer,
  MatrixSequencePlayTrainer,
  RelaxTrainer,
  ResultTrainer,
  SpaceQuestionWasteTrainer,
  StorytellingTrainer,
  TablePipeTrainer,
  TextLettersPreviewTrainer,
  TextLettersTrainer,
  TextQuestionToFTrainer,
  TextReadingTrainer,
  TextTezirovanieTrainer,
  WordsColumnTrainer,
  WordsFillingTrainer,
  WordsLexisTrainer,
  WordsPairsTrainer,
  WordsQuestionCloseTrainer,
  WordsQuestionsWasteTrainer,
} from "./trainers"


import { ROUTES } from "./training.routing"

@NgModule({
  declarations: [
    TimerGlobalComponent,
    TimerLapComponent,
    TrainerSelectorComponent,

    TezirovanieDirective,
    TouchableDirective,

    TrainingLayout,

    TimerPipe,

    AbstractTrainer,
    ClassificationColorsTrainer,
    ClassificationDefinitionsTrainer,
    ClassificationWordsTrainer,
    GreetingTrainer,
    ImageCarpetsTrainer,
    ImageDifferencesTrainer,
    ImageExpressionsPreviewTrainer,
    ImageExpressionsTrainer,
    ImageFieldsPreviewTrainer,
    ImageFieldsQuestionTrainer,
    MathEquationTrainer,
    MathMiddleTrainer,
    MathSequenceTrainer,
    MathWasteTrainer,
    MatrixImagesFillingTrainer,
    MatrixImagesPreviewTrainer,
    MatrixImagesQuestionTrainer,
    MatrixSequenceFillingTrainer,
    MatrixSequencePlayTrainer,
    RelaxTrainer,
    ResultTrainer,
    SpaceQuestionWasteTrainer,
    StorytellingTrainer,
    TablePipeTrainer,
    TextLettersPreviewTrainer,
    TextLettersTrainer,
    TextQuestionToFTrainer,
    TextReadingTrainer,
    TextTezirovanieTrainer,
    WordsColumnTrainer,
    WordsFillingTrainer,
    WordsLexisTrainer,
    WordsPairsTrainer,
    WordsQuestionCloseTrainer,
    WordsQuestionsWasteTrainer,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

    AppCommonModule,
    WFormsModule,
  ],

  providers: [
    FullscreenService,
    KeypadService,
    PointerService,
    TimerService,
    TrainingService,
  ],
})
export class TrainingModule {}
