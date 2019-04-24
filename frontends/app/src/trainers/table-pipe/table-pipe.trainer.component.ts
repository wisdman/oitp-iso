import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  ITablePipeTrainerConfig,
  ITablePipeTrainerItem,
  ITablePipeTrainerItemActionType,
  ITablePipeTrainerResult,
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
  @Input()
  config!: ITablePipeTrainerConfig

  @Input()
  size!: IGameFieldSize

  result: ITablePipeTrainerResult = {
    id: "table-pipe",
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

  showCurrent!: boolean
  current: number = 0

  rules!: Array<ITablePipeTrainerItem>
  items!: Array<ITablePipeTrainerItem>

  ngOnInit() {
    this.showCurrent = !!this.config.showCurrent
    this.rules = this.config.items
    this.items = this.config.matrix.map(i => ({...this.rules[i]}))

    this.current = 0

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  constructor(private _sanitizer: DomSanitizer){}

  getImage(item: ITablePipeTrainerItem) {
    return this._sanitizer.bypassSecurityTrustUrl(item.data)
  }

  private _step(action: ITablePipeTrainerItemActionType) {
    const currentItem = this.items[this.current]
    currentItem.isSuccess = currentItem.action === action

    const current = this.current + 1
    const success = this.items.filter(item => item.isSuccess).length
    const error = this.items.length - success

    this._updateResult({ success, error, isFinish: current >= this.items.length })
    this.current = current
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

  @HostListener("window:swipeleft")
  onSwipeLeft() {
    return this._step("left")
  }

  @HostListener("window:swiperight")
  onSwipeRight() {
    return this._step("right")
  }

  @HostListener("window:swipeup")
  onSwipeUp() {
    return this._step("up")
  }

  @HostListener("window:swipedown")
  onSwipeDown() {
    return this._step("down")
  }
}
