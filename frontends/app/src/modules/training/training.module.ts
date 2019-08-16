import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import { AppCommonModule } from "../common"
import { ChartsModule } from "../charts"
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
  TouchableDirective,
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

    ButtonDirective,
    InputDirective,
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),

    AppCommonModule,
    ChartsModule,
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
