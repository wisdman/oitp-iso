import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  NgZone,
} from "@angular/core"

import { Subscription } from "rxjs"

import { RoughGenerator } from "../../lib/rough/generator"

import { LapTimerService } from "../../services"

import {
  ITablePipeTrainerConfig,
  ITablePipeTrainerItem,
  ITablePipeTrainerItemActionType,
  ITablePipeTrainerResult,
  TablePipeID,
} from "./table-pipe.trainer.interfaces"

const SWIPE_DELTA = 60
const isPointerEvent = "PointerEvent" in window
const isTouchEvents = "ontouchstart" in window

const preventFunction = function(event: Event) {
  event.preventDefault()
  event.stopPropagation()
}

@Component({
  selector: "trainer-table-pipe",
  templateUrl: "./table-pipe.trainer.component.html",
  styleUrls: [ "./table-pipe.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePipeTrainerComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private _lapTimerService: LapTimerService,
    private _elRef:ElementRef<HTMLElement>,
    private _ngZone: NgZone
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private get itemSize() {
    const value = this._style.getPropertyValue("--item-size")
    return Number.parseInt(value)
  }

  @Input()
  config!: ITablePipeTrainerConfig

  result: ITablePipeTrainerResult = {
    id: TablePipeID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITablePipeTrainerResult>()

  private _updateResult(result: Partial<ITablePipeTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._lockScroll()
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._lapTimerService.lapTimeout.subscribe(() => this._timeout())
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._unlockScroll()
  }

  current: number = 0
  rules!: Array<ITablePipeTrainerItem>
  matrix!: Array<ITablePipeTrainerItem>

  private _init() {
    this.current = 0

    const itemSize = this.itemSize
    const drawSize = itemSize - 4
    const svgGenerator = new RoughGenerator({}, { width: itemSize, height: itemSize } )

    this.rules = this.config.items.map(({data, action}) => {
      const sets = svgGenerator.rectangle(2, 2, drawSize, drawSize, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      return {
        data,
        action,

        viewBox: `0 0 ${itemSize} ${itemSize}`,
        width: itemSize,
        height: itemSize,

        path,
        fillPath,

        isSuccess: false,
        isError: false,
      }
    })

    this.matrix = this.config.matrix.map(i => {
      const sets = svgGenerator.rectangle(2, 2, drawSize, drawSize, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      return {
        ...this.rules[i],
        path,
        fillPath,
      }
    })
  }

  private _lockScroll() {
    this._ngZone.runOutsideAngular(() =>{
      document.documentElement.classList.add("touch-action-none")
      document.addEventListener("pointermove", preventFunction, { passive: false, capture: true })
      document.addEventListener("touchmove", preventFunction, { passive: false, capture: true })
    })
  }

  private _unlockScroll() {
    this._ngZone.runOutsideAngular(() =>{
      document.documentElement.classList.remove("touch-action-none")
      document.removeEventListener("pointermove", preventFunction, { capture: true })
      document.removeEventListener("touchmove", preventFunction, { capture: true })
    })
  }

  private _step(action: ITablePipeTrainerItemActionType) {
    const currentItem = this.matrix[this.current]
    currentItem.isSuccess = currentItem.action === action
    currentItem.isError = !currentItem.isSuccess

    const result = this.matrix.reduce((prev, item) => {
      if (item.isSuccess) prev.success++
      if (item.isError) prev.error++
      return prev
    },{success: 0, error: 0})

    const next = this.current + 1
    if (next >= this.matrix.length) {
      this._updateResult({ ...result, isFinish: true })
    } else {
      this._updateResult({ ...result, isFinish: false })
      this.current = next
    }
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent({key}: KeyboardEvent) {
    switch (key) {
      case "ArrowUp":
        return this._step("up")
      case "ArrowDown":
        return this._step("down")
      case "ArrowLeft":
        return this._step("left")
      case "ArrowRight":
        return this._step("right")
    }
  }

  private _startX?: number
  private _startY?: number

  private _onPointerDown(x: number, y: number) {
    this._startX = x
    this._startY = y
  }

  private _onPointerUp(x: number, y: number) {
    if (this._startX === undefined || this._startY === undefined) {
      return
    }

    const deltaX = this._startX - x
    const deltaY = this._startY - y
    this._startX = undefined
    this._startY = undefined

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > SWIPE_DELTA)
        this._step("left")
      else if (deltaX < SWIPE_DELTA * -1)
        this._step("right")
    } else {
      if (deltaY > SWIPE_DELTA)
        this._step("up")
      else if (deltaY < SWIPE_DELTA * -1)
        this._step("down")
    }
  }

  @HostListener("document:pointerdown", ["$event"]) onPointerDown(event: PointerEvent) {
    if (!event.isPrimary) {
      return
    }
    this._onPointerDown(event.clientX, event.clientY)
  }

  @HostListener("document:touchstart", ["$event"]) onTouchStart(event: TouchEvent) {
    if (isPointerEvent) {
      return
    }

    if (event.changedTouches.length !== 1) {
      return
    }

    const touch = event.changedTouches[0]
    this._onPointerDown(touch.clientX, touch.clientY)
  }

  @HostListener("document:mousedown", ["$event"]) onMouseDown(event: MouseEvent) {
    if (isPointerEvent || isTouchEvents) {
      return
    }
    this._onPointerDown(event.clientX, event.clientY)
  }

  @HostListener("document:pointerup", ["$event"]) onPointerUp(event: PointerEvent) {
    if (!event.isPrimary) {
      return
    }
    this._onPointerUp(event.clientX, event.clientY)
  }

  @HostListener("document:touchend", ["$event"]) onTouchEnd(event: TouchEvent) {
     if (isPointerEvent) {
      return
    }

    if (event.changedTouches.length !== 1) {
      return
    }

    const touch = event.changedTouches[0]
    this._onPointerUp(touch.clientX, touch.clientY)
  }

  @HostListener("document:mouseup", ["$event"]) onMouseUp(event: MouseEvent) {
    if (isPointerEvent || isTouchEvents) {
      return
    }
    this._onPointerUp(event.clientX, event.clientY)
  }
}
