import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainerComponent } from "../abstract"

import {
  IMathSequenceTrainerItem,
  IMathSequenceTrainerConfig,
  IMathSequenceTrainerResult,
} from "./math-sequence.trainer.interfaces"

@Component({
  selector: "trainer-math-sequence",
  templateUrl: "./math-sequence.trainer.component.html",
  styleUrls: [ "./math-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathSequenceTrainerComponent
extends AbstractTrainerComponent<IMathSequenceTrainerConfig, IMathSequenceTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<IMathSequenceTrainerItem>
  item!: IMathSequenceTrainerItem

  userData: string = ""
  isSuccess: boolean = false
  isAnswerShown: boolean = false

  private _keypadEnterSubscription!: Subscription
  private _keypadSpaceSubscription!: Subscription

  init() {
    this.keypadService.show("NUMBERS")

    this.userData = ""
    this.isSuccess = true
    this.isAnswerShown = false

    this.items = this.config.items.slice(0,-1)
    this.item = this.config.items[this.config.items.length - 1]

    if (this._keypadEnterSubscription) this._keypadEnterSubscription.unsubscribe()
    this._keypadEnterSubscription = this.keypadService.enter
                                        .subscribe(() => this.mode === "play" ? this.showResult() : this.finish())

    if (this._keypadSpaceSubscription) this._keypadSpaceSubscription.unsubscribe()
    this._keypadSpaceSubscription = this.keypadService.space
                                        .subscribe(() => this.mode === "result" && this.finish())

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  destroy() {
    if (this._keypadEnterSubscription) this._keypadEnterSubscription.unsubscribe()
    if (this._keypadSpaceSubscription) this._keypadSpaceSubscription.unsubscribe()
    this.keypadService.hide()
  }

  showResult() {
    this.setTimeout(0)

    if (this.userData.trim() === "") {
      this.userData = "0"
    }

    this.isSuccess = Number.parseFloat(this.userData) === this.item.data
    this.updateResult({ success: this.isSuccess ? 1 : 0, error: !this.isSuccess ? 1 : 0 })

    this.mode = "result"
    this.markForCheck()
  }

  showAnswer() {
    this.isAnswerShown = true
  }

  timeout() {
    super.timeout()
    this.showResult()
  }

}
