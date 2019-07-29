import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { ISpaceQuestionWasteTrainerConfig } from "./space-question-waste.trainer.interfaces"

@Component({
  selector: "trainer-space-question-waste",
  templateUrl: "./space-question-waste.trainer.component.html",
  styleUrls: [ "./space-question-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceQuestionWasteTrainerComponent
  extends AbstractTrainerComponent<ISpaceQuestionWasteTrainerConfig> {

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
