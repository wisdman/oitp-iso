import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

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

  init() {
    this.items = this.config.items
                            .map((data, i) => ({
                              data: String(data),
                              correct: i === this.config.items.length - 1
                            }))
                            .sort(() => Math.random() - 0.5)

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
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

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    this.updateResult({ result: Math.round(success / max * 100) })
    super.finish()
  }
}