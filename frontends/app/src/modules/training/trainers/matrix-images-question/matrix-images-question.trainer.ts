import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ISelectorItem } from "../../components/trainer-selector"
import { IMatrixImagesQuestionConfig } from "./matrix-images-question.interfaces"

const ASSETS_ICONS = "/assets/icons"

@Component({
  selector: "trainer-matrix-images-question",
  templateUrl: "./matrix-images-question.trainer.html",
  styleUrls: [ "./matrix-images-question.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixImagesQuestionTrainer extends AbstractTrainer<IMatrixImagesQuestionConfig> {

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
