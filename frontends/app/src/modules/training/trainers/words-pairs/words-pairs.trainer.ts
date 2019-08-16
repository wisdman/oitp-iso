import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IWordsPairsConfig } from "./words-pairs.interfaces"

@Component({
  selector: "trainer-words-pairs",
  templateUrl: "./words-pairs.trainer.html",
  styleUrls: [ "./words-pairs.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsPairsTrainer extends AbstractTrainer<IWordsPairsConfig> {

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace("Й", "И")
                .replace("Ё", "Е")
                .replace(/[^0-9A-ZА-Я\s]+/ig,"")
                .replace(/\s+/ig, " ")
                .trim()

  }

  items!: Array<[
    { data: string, userData: string, isSuccess?: boolean },
    { data: string, userData: string, isSuccess?: boolean }
  ]>
  hidden!: number

  init() {
    this.fullscreenService.unlock()
    this.items = this.config.items.map(([A, B])=>[{data: A, userData: A}, {data: B, userData: B}])
    this.hidden = Math.round(Math.random())

    this.preview()
  }

  start() {
    super.start()
    this.items.forEach(value => value[this.hidden].userData = "")
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()
    this.items.forEach(value =>
      value[this.hidden].isSuccess =
        this._prepareString(value[this.hidden].data) === this._prepareString(value[this.hidden].userData)
    )
  }

  finish() {
    const success = this.items.reduce((acc, value) => value[this.hidden].isSuccess ? ++acc : acc, 0)
    super.finish(success / this.items.length * 100)
  }
}
