import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import { Subscription } from "rxjs"

import {
  AbstractTrainerComponent,
  SVGRectangle,
} from "../abstract"

import {
  ITableWordsTrainerConfig,
  ITableWordsTrainerResult,
} from "./table-words.trainer.interfaces"

interface IItem extends SVGRectangle { data: string }
type IActiveItem = IItem & {column: string}

@Component({
  selector: "trainer-table-words",
  templateUrl: "./table-words.trainer.component.html",
  styleUrls: [ "./table-words.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWordsTrainerComponent extends AbstractTrainerComponent<ITableWordsTrainerConfig, ITableWordsTrainerResult> {

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  headers!: Array<IItem>
  items!: Array<IActiveItem>
  currentItem?: IActiveItem

  private _keypadTabSubscriber!: Subscription

  init() {
    this.keypadService.show("RU")

    const runeSize = this.getCSSPropertyIntValue("--trainer-text-item-height");
    const columnWidth = this.getCSSPropertyIntValue("--column-width");
    const gap = this.getCSSPropertyIntValue("--gap");
    const padding = this.getCSSPropertyIntValue("--padding");

    const columns = this.config.columns.length
    const rows = this.config.runes.length

    this.matrixWidth = padding
                     + runeSize
                     + columnWidth * columns + gap * columns
                     + padding

    this.matrixHeight = padding
                      + runeSize
                      + runeSize * rows + gap * rows
                      + padding

    this.headers = [
      ...["", ...this.config.runes].map((data, i) =>
          ({...this.genSVGRectangle(padding, padding + runeSize * i + gap * i, runeSize, runeSize), data})
      ),
      ...this.config.columns.map((data, i) =>
          ({...this.genSVGRectangle(padding + runeSize + columnWidth * i + gap * i, padding, columnWidth, runeSize), data})
      ),
    ]

    this.items = this.config.columns.map((column, i) => {
      const x = padding + runeSize + columnWidth * i + gap * i
      return this.config.runes.map((_, j) =>
        ({...this.genSVGRectangle(x, padding + runeSize + runeSize * j + gap * j, columnWidth, runeSize), column, data: ""})
      )
    }).flat()

    this.currentItem = this.items.length > 0 ? this.items[0] : undefined

    if (this._keypadTabSubscriber) this._keypadTabSubscriber.unsubscribe()
    this._keypadTabSubscriber = this.keypadService.tab
                                .subscribe(() => this._onTab())

    this.mode = "play"
    this.setTimeout(10)
    // this.setTimeout(10 || this.config.timeLimit)
  }

  destroy() {
    if (this._keypadTabSubscriber) this._keypadTabSubscriber.unsubscribe()
    this.keypadService.hide()
  }

  timeout() {
    console.log("TIMEOUT")
  }

  private _onTab() {
    if (!this.currentItem) {
      this.currentItem = this.items.length > 0 ? this.items[0] : undefined
      this.markForCheck()
      return
    }

    let idx = this.items.indexOf(this.currentItem) + 1

    if (idx >= this.items.length) {
      this.currentItem = undefined
    }

    this.currentItem = this.items[idx]
    this.markForCheck()
  }

  onTouch(item: IActiveItem) {
    this.currentItem = item
  }

  onButtonTouch() {

  }

}
