import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  ISpaceQuestionWasteTrainerConfig,
  ISpaceQuestionWasteTrainerResult,
} from "./space-question-waste.trainer.interfaces"

@Component({
  selector: "trainer-space-question-waste",
  templateUrl: "./space-question-waste.trainer.component.html",
  styleUrls: [ "./space-question-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceQuestionWasteTrainerComponent
extends AbstractTrainerComponent<ISpaceQuestionWasteTrainerConfig, ISpaceQuestionWasteTrainerResult> {

  mode: "play" | "result" = "play"

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = this.config.items

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
    this.timeMeter()
  }

  showResult() {
    this.setTimeout(0)
    this.timeMeter()
    this.mode = "result"

    this.items.forEach(item => {
      item.isSuccess = item.isActive && item.correct
      item.isError = item.isActive && !item.correct
      item.isMark = !item.isActive && item.correct
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

    const result = Math.round(success / max * 100)
    this.updateResult({ result: result < 0 ? 0 : result > 100 ? 100 : result })
    super.finish()
  }
}
