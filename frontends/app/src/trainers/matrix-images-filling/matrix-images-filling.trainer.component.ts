import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import { SafeUrl } from "@angular/platform-browser"

import { Subscription } from "rxjs"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { IPointerEvent } from "../../lib/pointer-events"

import { IMatrixImagesFillingTrainerConfig } from "./matrix-images-filling.trainer.interfaces"

@Component({
  selector: "trainer-matrix-images-filling",
  templateUrl: "./matrix-images-filling.trainer.component.html",
  styleUrls: [ "./matrix-images-filling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixImagesFillingTrainerComponent
  extends AbstractTrainerComponent<IMatrixImagesFillingTrainerConfig> {

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  current?: {
    data: number,
    transform: string,
  }
  currentIcon?: SafeUrl

  defs!: Array<string>
  matrix!: Array<SVGShape & { data: number, userData: number }>
  items!: Array<SVGShape & { data: number }>

  imageSize!: number

  private _pointerupSubscriber!: Subscription
  private _pointermoveSubscriber!: Subscription

  init() {
    this.current = undefined
    this.currentIcon = undefined

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
    const itemsHeight = itemHeight * itemsRows + gap * (itemsRows - 1)

    const maxWidth = Math.max(matrixWidth, itemsWidth)

    this.matrixWidth = maxWidth
                     + padding * 2

    this.matrixHeight = matrixHeight
                      + gap * 4
                      + itemsHeight
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

    if (this._pointerupSubscriber) this._pointerupSubscriber.unsubscribe()
    this._pointerupSubscriber = this.pointerService.pointerup.subscribe(event => this.onPointerUp(event))

    if (this._pointermoveSubscriber) this._pointermoveSubscriber.unsubscribe()
    this._pointermoveSubscriber = this.pointerService.pointermove.subscribe(event => this.onpointerMove(event))
  }

  destroy() {
    this._pointerupSubscriber.unsubscribe()
    this._pointermoveSubscriber.unsubscribe()
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()
    this.current = undefined
    this.currentIcon = undefined
  }

  finish() {
    const success = this.matrix.reduce((sum, {data, userData}) => sum + (data === userData ? 1 : 0), 0)
    super.finish(success / this.config.matrix.length * 100)
  }

  onTouch({x, y}: IPointerEvent, data: number) {
    if (this.mode !== "play") {
      return
    }

    if (data === undefined || data < 0 || this.defs[data] === undefined) {
      this.current = undefined
      return
    }

    const transform = `translate(${x}px, ${y}px)`
    this.current = { data, transform }
    this.currentIcon = this.sanitizeUrl(this.defs[this.current.data])
    this.markForCheck()
  }

  onPointerUp({x, y}: IPointerEvent) {
    if (!this.current) {
      return
    }
    const current = this.current

    this.current = undefined
    this.currentIcon = undefined
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

    if (this.matrix.every(({userData}) => userData >= 0)) {
      this.result()
    }
  }

  onpointerMove({x, y}: IPointerEvent) {
    if (!this.current) {
      return
    }
    this.current.transform = `translate(${x}px, ${y}px)`
    this.markForCheck()
  }
}
