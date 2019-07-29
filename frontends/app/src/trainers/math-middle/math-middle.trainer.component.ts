import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { IMathMiddleTrainerConfig } from "./math-middle.trainer.interfaces"

@Component({
  selector: "trainer-math-middle",
  templateUrl: "./math-middle.trainer.component.html",
  styleUrls: [ "./math-middle.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathMiddleTrainerComponent
  extends AbstractTrainerComponent<IMathMiddleTrainerConfig> {

  items!: Array<{
    data: Array<number>,
    answer: string,
  }>
  item!: {
    data: Array<number>,
    answer: string,
  }

  userData?: number
  isSuccess: boolean = false
  isAnswerShown: boolean = false

  init() {
    this.fullscreenService.unlock()

    this.userData = undefined
    this.isSuccess = false
    this.isAnswerShown = false

    this.items = this.config.items.slice(0,-1)
    this.item = this.config.items[this.config.items.length - 1]
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()

    if (!this.userData) {
      this.userData = 0
    }

    this.isSuccess = this.userData === this.item.data[1]
  }

  showAnswer() {
    this.isAnswerShown = true
  }

  finish() {
    super.finish(this.isSuccess)
  }
}
