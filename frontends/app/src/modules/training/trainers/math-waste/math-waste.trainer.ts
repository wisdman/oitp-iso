import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IMathWasteConfig } from "./math-waste.interfaces"
import { ISelectorItem } from "../../components/trainer-selector"

@Component({
  selector: "trainer-math-waste",
  templateUrl: "./math-waste.trainer.html",
  styleUrls: [ "./math-waste.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathWasteTrainer extends AbstractTrainer<IMathWasteConfig> {

  items!: Array<ISelectorItem & { correct: boolean }>

  isAnswerShown: boolean = false

  init() {
    this.items = this.config.items
                            .map(({data, correct}) => ({
                              data: String(data),
                              correct
                            }))
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()
    this.items.forEach(items => {
      items.isSuccess = items.isActive && items.correct
      items.isError = items.isActive && !items.correct
      items.isMark = !items.isActive && items.correct
    })
  }

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    super.finish(Math.round(success / max * 100))
  }
}