import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  genSVGRectangle,
} from "../../lib/svg"

import {
  IWordsColumnsTrainerConfig,
  IWordsColumnsTrainerResult,
} from "./words-columns.trainer.interfaces"

interface IItem {
  data: string
  user: string

  column: number,

  x: number,
  y: number,
  fillPath: string,
  path: string,
}

@Component({
  selector: "trainer-words-columns",
  templateUrl: "./words-columns.trainer.component.html",
  styleUrls: [ "./words-columns.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnsTrainerComponent
extends AbstractTrainerComponent<IWordsColumnsTrainerConfig, IWordsColumnsTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  items!: Array<IItem>
  currentItem?: IItem
  hiddenColumn!: number

  init() {
    this.mode = "show"
    this.hiddenColumn = -1

    const rowHeight = this.getCSSPropertyIntValue("--row-height");
    const columnWidth = this.getCSSPropertyIntValue("--column-width");
    const gap = this.getCSSPropertyIntValue("--gap");
    const padding = this.getCSSPropertyIntValue("--padding");

    const columns = this.config.items[0].length
    const rows = this.config.items.length

    const width = padding
                + columnWidth * columns + gap * (columns - 1)
                + padding

    const height = padding
                 + rowHeight * rows + gap * (rows - 1)
                 + padding

    this.matrixWidth = width
    this.matrixHeight = height

    this.items = this.config.items.map((row, i) => {
      const y = padding + rowHeight * i + gap * i
      return row.map((data, j) => {
        const x = padding + columnWidth * j + gap * j

        data = data.toUpperCase()
        return {
          ...genSVGRectangle(x, y, columnWidth, rowHeight),
          column: j,

          data: data,
          user: data,
        }
      })
    }).flat()
  }

  private _play() {
    this.hiddenColumn = Math.floor(Math.random() * this.config.items[0].length)
    this.items.forEach(item => item.column === this.hiddenColumn ? item.user = "" : undefined)
    this.mode = "play"
    this.markForCheck()
    this.setTimeout(this.config.playTimeLimit)

    const item = this.items.find(item => item.column === this.hiddenColumn)
    if (!item) {
      return
    }

    this.currentItem = item
  }

  private _result() {
    this.mode = "result"
    this.markForCheck()
    this.setTimeout(0)
  }

  timeout() {
    if (this.mode === "play") {
      super.timeout()
      this._result()
      return
    }

    this._play()
  }

  onTouch(item: IItem) {
    if (item.column === this.hiddenColumn) {
      this.currentItem = item
    }
  }

  onKey(key: string) {
    if (!this.currentItem) {
      return
    }

    switch (key) {
      case "TAB":
      case "ENTER":
        for (let i = this.items.indexOf(this.currentItem) + 1; i < this.items.length; i++) {
          if (this.items[i].column === this.hiddenColumn) {
            this.currentItem = this.items[i]
            return
          }
        }

        const item = this.items.find(item => item.column === this.hiddenColumn)
        if (!item) {
          return
        }

        this.currentItem = item
        return

      case "BACKSPACE":
        this.currentItem.user = this.currentItem.data.slice(0,-1);
        return

      default:
        this.currentItem.user += key
        return
    }
  }

  onButtonTouch() {
    if (this.mode === "show") {
      this._play()
      return
    }

    if (this.mode === "play") {
      this._result()
      return
    }

    if (this.mode === "result") {
      this.finish()
      return
    }
  }

}
