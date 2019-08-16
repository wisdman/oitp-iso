import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IWordsColumnConfig } from "./words-column.interfaces"

@Component({
  selector: "trainer-words-column",
  templateUrl: "./words-column.trainer.html",
  styleUrls: [ "./words-column.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnTrainer extends AbstractTrainer<IWordsColumnConfig> {

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace(/[^0-9A-ZА-ЯЙЁ\s]+/ig,"")
                .replace(/\s+/, " ")
                .trim()
                .replace("Й", "И")
                .replace("Ё", "Е")
  }


  items!: Array<{
    data: string
    userData: string
    isSuccess?: boolean
  }>

  init() {
    this.fullscreenService.unlock()
    this.items = this.config.items.map(data => ({data, userData: data}))

    this.preview()
  }

  timeout() {
    if (this.mode === "preview") {
      this.start()
      return
    }

    this.result()
  }

  start() {
    super.start()
    this.items.forEach(value => value.userData = "")
  }

  result() {
    super.result()
    this.items.forEach(value =>
      value.isSuccess = this._prepareString(value.data) === this._prepareString(value.userData)
    )
  }

  finish() {
    const success = this.items.reduce((acc, {isSuccess}) => isSuccess ? ++acc : acc, 0)
    super.finish(success / this.items.length * 100)
  }
}
