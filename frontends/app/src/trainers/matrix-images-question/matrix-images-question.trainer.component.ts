import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { IMatrixImagesQuestionTrainerConfig } from "./matrix-images-question.trainer.interfaces"

@Component({
  selector: "trainer-matrix-images-question",
  templateUrl: "./matrix-images-question.trainer.component.html",
  styleUrls: [ "./matrix-images-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixImagesQuestionTrainerComponent
  extends AbstractTrainerComponent<IMatrixImagesQuestionTrainerConfig> {

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
  }

  timeout() {
    super.timeout()
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
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess, isError}) => [
      correct ? ++max : max,
      isSuccess ? ++success : isError ? --success : success,
    ], [0, 0])

    super.finish(success / max * 100)
  }
}
