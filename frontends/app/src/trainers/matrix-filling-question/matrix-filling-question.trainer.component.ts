import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IMatrixFillingQuestionTrainerConfig,
  IMatrixFillingQuestionTrainerResult,
} from "./matrix-filling-question.trainer.interfaces"

@Component({
  selector: "trainer-matrix-filling-question",
  templateUrl: "./matrix-filling-question.trainer.component.html",
  styleUrls: [ "./matrix-filling-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFillingQuestionTrainerComponent
extends AbstractTrainerComponent<IMatrixFillingQuestionTrainerConfig, IMatrixFillingQuestionTrainerResult> {

  mode: "play" | "result" = "play"

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = this.config.items
                     .map(({icon, correct}) => ({
                       data: this.getIconHref(icon),
                       correct
                     }))
                     .sort(() => Math.random() - 0.5)
                     .sort(() => Math.random() - 0.5)

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
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess, isError}) => [
      correct ? ++max : max,
      isSuccess ? ++success : isError ? --success : success,
    ], [0, 0])

    const result = Math.round(success / max * 100)
    this.updateResult({ result: result < 0 ? 0 : result > 100 ? 100 : result })
    super.finish()
  }
}
