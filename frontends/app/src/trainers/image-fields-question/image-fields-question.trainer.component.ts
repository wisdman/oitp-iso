import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { IImageFieldsQuestionTrainerConfig } from "./image-fields-question.trainer.interfaces"

@Component({
  selector: "trainer-image-fields-question",
  templateUrl: "./image-fields-question.trainer.component.html",
  styleUrls: [ "./image-fields-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldsQuestionTrainerComponent
  extends AbstractTrainerComponent<IImageFieldsQuestionTrainerConfig> {

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
  }

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess, isError}) => [
      correct ? ++max : max,
      isSuccess ? ++success : isError ? --success : success,
    ], [0, 0])

    super.finish(Math.round(success / max * 100))
  }
}
