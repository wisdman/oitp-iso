import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { IWordsColumnTrainerConfig } from "./words-column.trainer.interfaces"

@Component({
  selector: "trainer-words-column",
  templateUrl: "./words-column.trainer.component.html",
  styleUrls: [ "./words-column.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnTrainerComponent
extends AbstractTrainerComponent<IWordsColumnTrainerConfig> {

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
  }

  start() {
    this.setTimeout(this.config.previewTimeLimit)
    this.markForCheck()
  }

  startPlay() {
    this.items.forEach(value => value.userData = "")
    super.start()
  }

  result() {
    this.items.forEach(value =>
      value.isSuccess = this._prepareString(value.data) === this._prepareString(value.userData)
    )
    super.result()
  }

  timeout() {
    switch (this.mode) {
      case "init":
        this.start()
        break;

      case "play":
        super.timeout()
        this.result()
        break;
    }
  }

  finish() {
    const success = this.items.reduce((acc, {isSuccess}) => isSuccess ? ++acc : acc, 0)
    super.finish(success / this.items.length * 100)
  }
}
