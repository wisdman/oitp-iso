import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

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

  private _keypadEnterSubscriber!: Subscription
  private _keypadSpaceSubscriber!: Subscription

  init() {
    this.items = Array.from(this.config.items)

    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    this._keypadEnterSubscriber = this.keypadService.enter
                                      .subscribe(() => this.mode === "result" && this.finish())

    if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
    this._keypadEnterSubscriber = this.keypadService.space
                                      .subscribe(() => this.mode === "result" && this.finish())

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  destroy() {
    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
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
