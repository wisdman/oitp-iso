import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ISelectorItem } from "../../components/trainer-selector"
import { IWordsQuestionsWasteConfig } from "./words-questions-waste.interfaces"

@Component({
  selector: "trainer-words-questions-waste",
  templateUrl: "./words-questions-waste.trainer.html",
  styleUrls: [ "./words-questions-waste.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsQuestionsWasteTrainer extends AbstractTrainer<IWordsQuestionsWasteConfig> {

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
