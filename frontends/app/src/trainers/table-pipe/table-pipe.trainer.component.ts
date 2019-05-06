import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  LapTimerService,
} from "../../services"

import {
  ITablePipeTrainerConfig,
  ITablePipeTrainerItem,
  ITablePipeTrainerItemActionType,
  ITablePipeTrainerResult,
  TablePipeID,
} from "./table-pipe.trainer.interfaces"

import {
  IGameFieldSize
} from "../interfaces"

@Component({
  selector: "trainer-table-pipe",
  templateUrl: "./table-pipe.trainer.component.html",
  styleUrls: [ "./table-pipe.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePipeTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _lapTimerService: LapTimerService,
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private get itemSize() {
    const value = this._style.getPropertyValue("--item-size")
    return Number.parseInt(value)
  }

  @Input()
  config!: ITablePipeTrainerConfig

  @Input()
  size!: IGameFieldSize

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

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
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

  OnTimeout() {
    console.dir("OnTimeout")
    this._updateResult({ isFinish: true })
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
      if (deltaX > 100)
        this._step("left")
      else if (deltaX < -100)
        this._step("right")
    } else {
      if (deltaY > 100)
        this._step("up")
      else if (deltaY < -100)
        this._step("down")
    }
  }

  @HostListener("document:pointerdown", ["$event"]) onPointerDown(event: PointerEvent) {
    this._onPointerDown(event.screenX, event.screenY)
  }

  @HostListener("document:pointerup", ["$event"]) onPointerUp(event: PointerEvent) {
    this._onPointerUp(event.screenX, event.screenY)
  }
}
