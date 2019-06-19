import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  ITextQuestionTrainerConfig,
  ITextQuestionTrainerResult,
} from "./text-question.trainer.interfaces"

@Component({
  selector: "trainer-text-question",
  templateUrl: "./text-question.trainer.component.html",
  styleUrls: [ "./text-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextQuestionTrainerComponent
extends AbstractTrainerComponent<ITextQuestionTrainerConfig, ITextQuestionTrainerResult> {

  mode: "play" | "result" = "play"

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.fullscreenService.lock()

    this.items = [{
      data: "Истина",
      correct: this.config.correct,
    },{
      data: "Ложь",
      correct: !this.config.correct,
    }]

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
