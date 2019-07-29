import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { IWordsQuestionsCloseTrainerConfig } from "./words-questions-close.trainer.interfaces"

@Component({
  selector: "trainer-words-questions-close",
  templateUrl: "./words-questions-close.trainer.component.html",
  styleUrls: [ "./words-questions-close.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsQuestionCloseTrainerComponent
  extends AbstractTrainerComponent<IWordsQuestionsCloseTrainerConfig> {

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = Array.from(this.config.items)
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
