import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainerComponent } from "../abstract"

import {
  IMathMiddleTrainerItem,
  IMathMiddleTrainerConfig,
  IMathMiddleTrainerResult,
} from "./math-middle.trainer.interfaces"

@Component({
  selector: "trainer-math-middle",
  templateUrl: "./math-middle.trainer.component.html",
  styleUrls: [ "./math-middle.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathMiddleTrainerComponent
extends AbstractTrainerComponent<IMathMiddleTrainerConfig, IMathMiddleTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<IMathMiddleTrainerItem>
  item!: IMathMiddleTrainerItem

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
    this.keypadService.hide()
  }

  showResult() {
    this.setTimeout(0)

    if (this.userData.trim() === "") {
      this.userData = "0"
    }

    this.isSuccess = Number.parseFloat(this.userData) === this.item.data[1]
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
