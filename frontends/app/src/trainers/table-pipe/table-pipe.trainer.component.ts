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
} from "@angular/core"

import { RoughGenerator } from "../../lib/rough/generator"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"
import { FullscreenService } from "../../services"

import {
  ITablePipeTrainerConfig,
  ITablePipeTrainerItem,
  ITablePipeTrainerItemActionType,
  ITablePipeTrainerResult,
  TablePipeID,
} from "./table-pipe.trainer.interfaces"

@Component({
  selector: "trainer-table-pipe",
  templateUrl: "./table-pipe.trainer.component.html",
  styleUrls: [ "./table-pipe.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePipeTrainerComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private _elRef:ElementRef<HTMLElement>,
    private _timerLapService: TimerLapService,
    private _fullscreenService: FullscreenService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
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
  private _swipeSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })

    if (this._swipeSubscriber) this._swipeSubscriber.unsubscribe()
    this._swipeSubscriber = this._fullscreenService.swipe.subscribe(action => this._step(action))

    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.timeLimit || 0)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._swipeSubscriber) this._swipeSubscriber.unsubscribe()
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  current: number = 0
  rules!: Array<ITablePipeTrainerItem>
  matrix!: Array<ITablePipeTrainerItem>

  private _init() {
    this.current = 0

    const itemSize = this._getCSSPropertyIntValue("--item-size")
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
}
