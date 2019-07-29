import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { ITextQuestionToFTrainerConfig } from "./text-question-tof.trainer.interfaces"

@Component({
  selector: "trainer-text-question-tof",
  templateUrl: "./text-question-tof.trainer.component.html",
  styleUrls: [ "./text-question-tof.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextQuestionToFTrainerComponent
  extends AbstractTrainerComponent<ITextQuestionToFTrainerConfig> {

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
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    super.finish(success / max * 100)
  }
}
