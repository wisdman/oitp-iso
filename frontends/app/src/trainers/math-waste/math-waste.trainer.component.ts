import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

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

  items!: Array<Array<number>> | Array<number>
  userResult: string = ""
  correctResult: number = NaN

  get isSuccess() {
    return Number.parseFloat(this.userResult) === this.correctResult
  }

  init() {
    this.mode = "play"
    this.userResult = ""

    switch (this.config.type) {
      case "middle":
        this.items = this.config.items as Array<Array<number>>
        this.correctResult = this.items[2][1]
        break;

      case "sequence":
        this.items = this.config.items.slice(0,-1) as Array<number>
        this.correctResult = (this.config.items as Array<number>)[this.config.items.length - 1] || NaN
        break;
    }

    this.setTimeout(this.config.timeLimit)
  }

  private _result() {
    this.setTimeout(0)
    this.mode = "result"
    this.markForCheck()
  }

  timeout() {
    this.updateResult({ isTimeout: true })
    this._result()
  }

  onKey(key: string) {
    if (this.mode !== "play") {
      return
    }

    switch (key) {
      case "BACKSPACE":
        this.userResult = this.userResult.slice(0,-1);
        break
      case ".":
        if (!this.userResult.match(/\./)) {
          this.userResult += key
        }
        break
      default:
        this.userResult += key
        break
    }
  }

  onButtonTouch() {
    if (this.mode === "play") {
      this._result()
      return
    }

    this.finish()
  }

}
