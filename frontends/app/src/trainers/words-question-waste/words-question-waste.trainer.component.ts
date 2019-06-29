import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IWordsQuestionWasteTrainerConfig,
  IWordsQuestionWasteTrainerResult,
} from "./words-question-waste.trainer.interfaces"

@Component({
  selector: "trainer-words-question-waste",
  templateUrl: "./words-question-waste.trainer.component.html",
  styleUrls: [ "./words-question-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsQuestionWasteTrainerComponent
extends AbstractTrainerComponent<IWordsQuestionWasteTrainerConfig, IWordsQuestionWasteTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = Array.from(this.config.items)

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"

    this.items.forEach(item => {
      item.isSuccess = item.isActive && item.correct
      item.isError = item.isActive && !item.correct
      item.isMark = !item.isActive && item.correct
    })

    this.markForCheck()
  }

  timeout() {
    super.timeout()
    this.showResult()
  }

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    this.updateResult({ result: Math.round(success / max * 100) })
    super.finish()
  }
}
