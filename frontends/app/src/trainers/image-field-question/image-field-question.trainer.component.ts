import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IImageFieldQuestionTrainerConfig,
  IImageFieldQuestionTrainerResult,
} from "./image-field-question.trainer.interfaces"

@Component({
  selector: "trainer-image-field-question",
  templateUrl: "./image-field-question.trainer.component.html",
  styleUrls: [ "./image-field-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldQuestionTrainerComponent
extends AbstractTrainerComponent<IImageFieldQuestionTrainerConfig, IImageFieldQuestionTrainerResult> {

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
  }

  showResult() {
    this.setTimeout(0)
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
}
