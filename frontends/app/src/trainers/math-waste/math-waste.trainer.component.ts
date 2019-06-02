import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  merge,
  Subscription,
} from "rxjs"

import { ISelectorItem } from "../../components/trainer-selector"

import { AbstractTrainerComponent } from "../abstract"

import {
  IMathWasteTrainerConfig,
  IMathWasteTrainerResult,
} from "./math-waste.trainer.interfaces"

@Component({
  selector: "trainer-math-waste",
  templateUrl: "./math-waste.trainer.component.html",
  styleUrls: [ "./math-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathWasteTrainerComponent
extends AbstractTrainerComponent<IMathWasteTrainerConfig, IMathWasteTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<ISelectorItem & { correct: boolean }>

  private _keypadSubscription!: Subscription

  init() {
    this.items = this.config.items
                            .map((data, i) => ({
                              data: String(data),
                              correct: i === this.config.items.length - 1
                            }))
                            .sort(() => Math.random() - 0.5)

    if (this._keypadSubscription) this._keypadSubscription.unsubscribe()
    this._keypadSubscription = merge(this.keypadService.enter, this.keypadService.space)
                                        .subscribe(() => this.mode === "result" && this.finish())


    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  destroy() {
    if (this._keypadSubscription) this._keypadSubscription.unsubscribe()
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"

    this.items.forEach(items => {
      items.isSuccess = items.isActive && items.correct
      items.isError = items.isActive && !items.correct
      items.isMark = !items.isActive && items.correct
    })

    this.markForCheck()
  }

  timeout() {
    super.timeout()
    this.showResult()
  }
}