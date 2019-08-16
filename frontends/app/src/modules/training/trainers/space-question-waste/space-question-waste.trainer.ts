import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ISelectorItem } from "../../components/trainer-selector"
import { ISpaceQuestionWasteConfig } from "./space-question-waste.interfaces"

@Component({
  selector: "trainer-space-question-waste",
  templateUrl: "./space-question-waste.trainer.html",
  styleUrls: [ "./space-question-waste.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceQuestionWasteTrainer extends AbstractTrainer<ISpaceQuestionWasteConfig> {

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = this.config.items
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()

    this.items.forEach(item => {
      item.isSuccess = item.isActive && item.correct
      item.isError = item.isActive && !item.correct
      item.isMark = !item.isActive && item.correct
    })

    this.markForCheck()
  }

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    super.finish(success / max * 100)
  }
}
