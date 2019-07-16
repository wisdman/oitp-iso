import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import { IWordsQuestionsWasteTrainerConfig } from "./words-questions-waste.trainer.interfaces"

@Component({
  selector: "trainer-words-questions-waste",
  templateUrl: "./words-questions-waste.trainer.component.html",
  styleUrls: [ "./words-questions-waste.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsQuestionsWasteTrainerComponent
  extends AbstractTrainerComponent<IWordsQuestionsWasteTrainerConfig> {

  items!: Array<ISelectorItem & { correct: boolean }>

  init() {
    this.items = Array.from(this.config.items)
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
    const [max, success] = this.items.reduce(([max, success], {correct, isSuccess}) => [
      correct ? ++max : max,
      isSuccess ? ++success : success,
    ], [0, 0])

    super.finish(success / max * 100)
  }
}
