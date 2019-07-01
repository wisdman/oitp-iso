import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  ITextReadingQuestionTrainerConfig,
  ITextReadingQuestionTrainerResult,
} from "./text-reading-question.trainer.interfaces"

@Component({
  selector: "trainer-text-reading-question",
  templateUrl: "./text-reading-question.trainer.component.html",
  styleUrls: [ "./text-reading-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextReadingQuestionTrainerComponent
extends AbstractTrainerComponent<ITextReadingQuestionTrainerConfig, ITextReadingQuestionTrainerResult> {

  mode: "play" | "result" = "play"

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
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

  finish() {
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    this.updateResult({ result: Math.round(success / max * 100) })
    super.finish()
  }
}