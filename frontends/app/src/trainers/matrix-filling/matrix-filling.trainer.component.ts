import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  genSVGRectangle,
} from "../../lib/svg"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerResult,
  IMatrixFillingTrainerItem,
  IMatrixFillingTrainerMatrixItem,
} from "./matrix-filling.trainer.interfaces"

const RESULT_TIMEOUT = 5

const isPointerEvent = "PointerEvent" in window
const isTouchEvents = "ontouchstart" in window

@Component({
  selector: "trainer-matrix-filling",
  templateUrl: "./matrix-filling.trainer.component.html",
  styleUrls: [ "./matrix-filling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFillingTrainerComponent
extends AbstractTrainerComponent<IMatrixFillingTrainerConfig, IMatrixFillingTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  items!: Array<IMatrixFillingTrainerItem>

  matrix!: Array<IMatrixFillingTrainerMatrixItem>

  shapeWidth: number = 0
  shapeHeight: number = 0

  init() {
    this._initEvents()
    this.mode = "show"

    const itemsCount = this.config.items.length

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    const imageSize = this.getCSSPropertyIntValue("--item-image-size")
    const imageMargin = this.getCSSPropertyIntValue("--item-image-margin")
    const strokeWidth = this.getCSSPropertyIntValue("--item-stroke-width")

    const boxSize = imageSize + imageMargin + strokeWidth * 2
    const gap = this.getCSSPropertyIntValue("--gap")
    const itemsMargin = this.getCSSPropertyIntValue("--items-margin")

    const itemsColumns = this.getCSSPropertyIntValue("--items-columns")
    const itemsRows = Math.ceil(itemsCount / itemsColumns)

    const itemsWidth = boxSize * itemsColumns + gap * (itemsColumns + 1)
    const itemsHeight = boxSize * itemsRows + gap * (itemsRows + 1)

    const matrixWidth = boxSize * columns + gap * (columns + 1)
    const matrixHeight = boxSize * rows + gap * (rows + 1)

    const width = Math.max(itemsWidth, matrixWidth)
    const height = matrixHeight + itemsMargin + itemsHeight

    const itemsOffsetLeft = Math.ceil((width - itemsWidth) / 2)
    const itemsOffsetTop = matrixHeight + itemsMargin

    const matrixOffsetLeft = Math.ceil((width - matrixWidth) / 2)

    this.matrixWidth = width
    this.matrixHeight = height

    this.shapeWidth = imageSize
    this.shapeHeight = imageSize

    this.items = this.config.items.map((data, i) => {
      const x = itemsOffsetLeft + (boxSize + gap) * (i % itemsColumns) + gap
      const y = itemsOffsetTop + (boxSize + gap) * Math.floor(i/itemsColumns) + gap

      return {
        ...genSVGRectangle(x, y, boxSize, boxSize),
        data: `/icons/${data}.svg`,
      }
    })

    this.matrix = this.config.matrix.map((data, i) => {
      const x = matrixOffsetLeft + (boxSize + gap) * (i % columns) + gap
      const y = (boxSize + gap) * Math.floor(i/columns) + gap

      return {
        ...genSVGRectangle(x, y, boxSize, boxSize),
        data: this.items[data] !== undefined ? data : -1,
        userData: -1,
      }
    })
  }

  destroy() {
    this._resetEvents()
  }

  timeout() {
    this.current = undefined
    switch (this.mode) {
      case "show":
        this.mode = "play"
        this.markForCheck()
        this.setTimeout(this.config.playTimeLimit || 0)
        return

      case "play":
        this.updateResult({ isTimeout: true })
        this.mode = "result"
        this.markForCheck()
        this.setTimeout(RESULT_TIMEOUT)
        return

      case "result":
        this.finish()
        return
    }
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
      this.mode = "result"
      this.markForCheck()
      this.setTimeout(RESULT_TIMEOUT)
    }
  }

  current?: {
    data: number,
    transform: string,
  }

  private _pointerDown(x: number, y: number, data?: number) {
    if (this.mode !== "play") {
      return
    }

    if (data === undefined || data < 0 || this.items[data] === undefined) {
      this.current = undefined
      return
    }

    const transform = `translate(${x}px, ${y}px)`
    this.current = { data, transform }
    this.markForCheck()
  }

  private _pointerUp(x: number, y: number) {
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

  private _pointerMove(x: number, y: number) {
    if (!this.current) {
      return
    }
    this.current.transform = `translate(${x}px, ${y}px)`
    this.markForCheck()
  }

  private _onPointerMoveListener!: (event: PointerEvent) => void
  private _onTouchMoveListener!: (event: TouchEvent) => void
  private _onMouseMoveListener!: (event: MouseEvent) => void

  private _initMoveListeners() {
    const self = this
    this._onPointerMoveListener = function(event: PointerEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (!event.isPrimary) {
        return
      }
      self._pointerMove(event.clientX, event.clientY)
    }

    this._onTouchMoveListener = function(event: TouchEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (isPointerEvent) {
        return
      }
      if (event.changedTouches.length !== 1) {
        return
      }

      const touch = event.changedTouches[0]
      self._pointerMove(touch.clientX, touch.clientY)
    }

    this._onMouseMoveListener = function(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (isPointerEvent || isTouchEvents) {
        return
      }
      self._pointerMove(event.clientX, event.clientY)
    }
  }

  private _initEvents() {
    this.current = undefined
    // document.documentElement.classList.add("touch-action-none")
    this._initMoveListeners()
    document.addEventListener("pointermove", this._onPointerMoveListener, { passive: false, capture: true })
    document.addEventListener("touchmove", this._onTouchMoveListener, { passive: false, capture: true })
    document.addEventListener("mousemove", this._onMouseMoveListener, { passive: false, capture: true })
  }

  private _resetEvents() {
    document.removeEventListener("pointermove", this._onPointerMoveListener, { capture: true })
    document.removeEventListener("touchmove", this._onTouchMoveListener, { capture: true })
    document.removeEventListener("mousemove", this._onMouseMoveListener, { capture: true })
    // document.documentElement.classList.remove("touch-action-none")
  }

  onPointerDown(event: PointerEvent, data?: number) {
    if (!event.isPrimary) {
      return
    }
    this._pointerDown(event.clientX, event.clientY, data)
  }

  onTouchStart(event: TouchEvent, data?: number) {
    if (isPointerEvent) {
      return
    }

    if (event.changedTouches.length !== 1) {
      return
    }

    const touch = event.changedTouches[0]
    this._pointerDown(touch.clientX, touch.clientY, data)
  }

  onMouseDown(event: MouseEvent, data?: number) {
    if (isPointerEvent || isTouchEvents) {
      return
    }
    this._pointerDown(event.clientX, event.clientY, data)
  }

  @HostListener("document:pointerup", ["$event"]) onHostPointerUp(event: PointerEvent) {
    if (!event.isPrimary) {
      return
    }
    this._pointerUp(event.clientX, event.clientY)
  }

  @HostListener("document:touchend", ["$event"]) onHostTouchEnd(event: TouchEvent) {
    if (isPointerEvent) {
      return
    }

    if (event.changedTouches.length !== 1) {
      return
    }

    const touch = event.changedTouches[0]
    this._pointerUp(touch.clientX, touch.clientY)
  }

  @HostListener("document:mouseup", ["$event"]) onHostMouseUp(event: MouseEvent) {
    if (isPointerEvent || isTouchEvents) {
      return
    }
    this._pointerUp(event.clientX, event.clientY)
  }
}
