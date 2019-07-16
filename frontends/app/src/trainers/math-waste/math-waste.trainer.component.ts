import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ISelectorItem } from "../../components/trainer-selector"

import { AbstractTrainerComponent } from "../abstract"

import { IMathWasteTrainerConfig } from "./math-waste.trainer.interfaces"

@Component({
  selector: "trainer-math-waste",
  templateUrl: "./math-waste.trainer.component.html",
  styleUrls: [ "./math-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathWasteTrainerComponent
  extends AbstractTrainerComponent<IMathWasteTrainerConfig> {

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = this.config.items
                            .map(({data, correct}) => ({
                              data: String(data),
                              correct
                            }))
                            .sort(() => Math.random() - 0.5)
  }

  timeout() {
    super.timeout()
    this.result()
  }

  result() {
    super.result()

    this.items.forEach(items => {
      items.isSuccess = items.isActive && items.correct
      items.isError = items.isActive && !items.correct
      items.isMark = !items.isActive && items.correct
    })

    this.markForCheck()
  }

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    super.finish(Math.round(success / max * 100))
  }
}