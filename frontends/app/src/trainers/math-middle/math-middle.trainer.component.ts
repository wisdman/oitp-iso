import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

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

  userData?: number
  isSuccess: boolean = false
  isAnswerShown: boolean = false

  init() {
    this.userData = undefined
    this.isSuccess = false
    this.isAnswerShown = false

    this.items = this.config.items.slice(0,-1)
    this.item = this.config.items[this.config.items.length - 1]

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)

    if (!this.userData) {
      this.userData = 0
    }

    this.isSuccess = this.userData === this.item.data[1]

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

  finish() {
    this.updateResult({
      success: this.isSuccess ? 1 : 0,
      error: !this.isSuccess ? 1 : 0,
    })
    super.finish()
  }
}
