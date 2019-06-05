import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import {
  merge,
  Subscription,
} from "rxjs"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ITouchData } from "../../directives/fast-touch"
import { IPointerEvent } from "../../lib/pointer-events"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerResult,
} from "./matrix-filling.trainer.interfaces"

@Component({
  selector: "trainer-matrix-filling",
  templateUrl: "./matrix-filling.trainer.component.html",
  styleUrls: [ "./matrix-filling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFillingTrainerComponent
extends AbstractTrainerComponent<IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult> {

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  mode: "show" | "play" | "result" = "show"
  isUnique!: boolean

  current?: {
    data: number,
    transform: string,
  }

  defs!: Array<string>
  matrix!: Array<SVGRectangle & { data: number, userData: number }>
  items!: Array<SVGRectangle & { data: number }>

  imageSize!: number
  itemsHeight!: number

  private _keypadSubscriber!: Subscription
  private _pointerupSubscriber!: Subscription
  private _pointermoveSubscriber!: Subscription

  init() {
    this.isUnique = [...new Set(this.config.matrix)].length === this.config.matrix.length

    this.current = undefined

    this.defs =this.config.items.map(icon => this.getIconHref(icon))

    this.imageSize = this.getCSSPropertyIntValue("--trainer-icon-size")

    const itemWidth = this.getCSSPropertyIntValue("--trainer-box-size")
    const itemHeight = itemWidth

    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    const itemsLength = this.defs.length
    const maxItemsColumns = this.getCSSPropertyIntValue("--max-columns")

    const itemsColumns = (() =>{
      for (let i = maxItemsColumns; i > 1; i--) {
        if (itemsLength % i === 0) return i
      }
      return maxItemsColumns
    })()

    const itemsRows = Math.ceil(itemsLength / itemsColumns)

    const matrixWidth = itemWidth * columns + gap * (columns - 1)
    const matrixHeight = itemHeight * rows + gap * (rows - 1)

    const itemsWidth = itemWidth * itemsColumns + gap * (itemsColumns - 1)
    this.itemsHeight = itemHeight * itemsRows + gap * (itemsRows - 1)

    const maxWidth = Math.max(matrixWidth, itemsWidth)

    this.matrixWidth = maxWidth
                     + padding * 2
    this.matrixHeight = matrixHeight
                      + padding * 2

    const matrixOffset = Math.round((maxWidth - matrixWidth) / 2)

    this.matrix = this.config.matrix.map((data, i) => {
      const x = padding + matrixOffset + (itemWidth + gap) * (i % columns)
      const y = padding + (itemHeight + gap) * Math.floor(i/columns)

      return {
        ...genSVGRectangle(x, y, itemWidth, itemHeight),
        data: this.defs[data] !== undefined ? data : -1,
        userData: -1,
      }
    })

    const itemsOffset = Math.round((maxWidth - itemsWidth) / 2)

    this.items = this.defs
                     .map((_, i) => i)
                     .sort(() => Math.random() - 0.5)
                     .sort(() => Math.random() - 0.5)
                     .map((data, i) => {
      const x = padding + itemsOffset + (itemWidth + gap) * (i % itemsColumns)
      const y = padding + matrixHeight + gap * 4 + (itemHeight + gap) * Math.floor(i/itemsColumns)
      return {
        ...genSVGRectangle(x, y, itemWidth, itemHeight),
        data,
      }
    })

    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
    this._keypadSubscriber = merge(this.keypadService.enter, this.keypadService.space)
                              .subscribe(() => this.onKeypad())

    if (this._pointerupSubscriber) this._pointerupSubscriber.unsubscribe()
    this._pointerupSubscriber = this.pointerService.pointerup.subscribe(event => this.onPointerUp(event))

    if (this._pointermoveSubscriber) this._pointermoveSubscriber.unsubscribe()
    this._pointermoveSubscriber = this.pointerService.pointermove.subscribe(event => this.onpointermMove(event))

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
  }

  destroy() {
    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
  }

  startPlay() {
    this.mode = "play"
    this.current = undefined

    const gap = this.getCSSPropertyIntValue("--gap")
    this.matrixHeight += gap*4 + this.itemsHeight

    this.markForCheck()

    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)

    this.mode = "result"
    this.current = undefined
    this.markForCheck()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return

      case "play":
        super.timeout()
        this.showResult()
        return
    }
  }

  onKeypad() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return
      case "result":
        this.finish()
        return
    }
  }

  onTouch({x, y}: ITouchData, data: number) {
    if (this.mode !== "play") {
      return
    }

    if (data === undefined || data < 0 || this.defs[data] === undefined) {
      this.current = undefined
      return
    }

    const transform = `translate(${x}px, ${y}px)`
    this.current = { data, transform }
    this.markForCheck()
  }

  onPointerUp({x, y}: IPointerEvent) {
    if (!this.current) {
      return
    }
    const current = this.current

    this.current = undefined
    this.detectChanges()

    const dropElement = document.elementFromPoint(x,y)
    if (!dropElement) {
      return
    }

    const gElement = dropElement.closest("[matrixIndex]")
    if (!gElement) {
      return
    }

    const matrixIDstr = gElement.getAttribute("matrixIndex")
    if (!matrixIDstr){
      return
    }

    const matrixID = Number.parseInt(matrixIDstr)
    if (Number.isNaN(matrixID)){
      return
    }

    if (this.matrix[matrixID] !== undefined) {
      this.matrix[matrixID].userData = current.data
      this.markForCheck()
    }

    this._step()
  }

  onpointermMove({x, y}: IPointerEvent) {
    if (!this.current) {
      return
    }
    this.current.transform = `translate(${x}px, ${y}px)`
    this.markForCheck()
  }

  private _step() {
    const {success, error, isFinish} = this.matrix.reduce( (prev, item) => {
      if (item.data < 0) {
        return prev
      }

      prev.success += item.data === item.userData ? 1 : 0
      prev.error += item.data !== item.userData ? 1 : 0
      prev.isFinish = prev.isFinish && item.userData >= 0
      return prev
    }, { success: 0, error: 0, isFinish: true } as { success: number, error: number, isFinish: boolean })

    this.updateResult({ success, error })

    if (isFinish) {
      this.showResult()
    }
  }
}
