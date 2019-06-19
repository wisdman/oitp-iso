import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IWordsQuestionCloseTrainerConfig,
  IWordsQuestionCloseTrainerResult,
} from "./words-question-close.trainer.interfaces"

@Component({
  selector: "trainer-words-question-close",
  templateUrl: "./words-question-close.trainer.component.html",
  styleUrls: [ "./words-question-close.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsQuestionCloseTrainerComponent
extends AbstractTrainerComponent<IWordsQuestionCloseTrainerConfig, IWordsQuestionCloseTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.fullscreenService.lock()

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
}
