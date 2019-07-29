import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { IMathSequenceTrainerConfig } from "./math-sequence.trainer.interfaces"

@Component({
  selector: "trainer-math-sequence",
  templateUrl: "./math-sequence.trainer.component.html",
  styleUrls: [ "./math-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathSequenceTrainerComponent
  extends AbstractTrainerComponent<IMathSequenceTrainerConfig> {

  items!: Array<{
    rune: string
    data: number
    act: string
  }>
  item!: {
    rune: string
    data: number
    act: string
  }

  userData?: number
  isSuccess: boolean = false
  isAnswerShown: boolean = false

  init() {
    this.fullscreenService.unlock()

    this.userData = undefined
    this.isSuccess = true
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

    this.isSuccess = this.userData === this.item.data
  }

  showAnswer() {
    this.isAnswerShown = true
  }

  finish() {
    super.finish(this.isSuccess)
  }

}
