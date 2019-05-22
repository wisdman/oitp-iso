import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { Subscription } from "rxjs"

import { TimerLapService } from "../../services"

import {
  IMathPuzzleTrainerConfig,
  IMathPuzzleTrainerResult,
  MathPuzzleTrainerID,
} from "./math-puzzle.trainer.interfaces"

@Component({
  selector: "trainer-math-puzzle",
  templateUrl: "./math-puzzle.trainer.component.html",
  styleUrls: [ "./math-puzzle.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathPuzzleTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IMathPuzzleTrainerConfig

  result: IMathPuzzleTrainerResult = {
    id: MathPuzzleTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMathPuzzleTrainerResult>()

  private _updateResult(result: Partial<IMathPuzzleTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.timeLimit)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  mode: "play" | "result" = "play"

  items!: Array<Array<number>> | Array<number>
  userResult: string = ""
  correctResult: number = NaN

  get isSuccess() {
    return Number.parseFloat(this.userResult) === this.correctResult
  }

  private _init() {
    this.mode = "play"
    this.userResult = ""

    switch (this.config.type) {
      case "middle":
        this.items = this.config.items as Array<Array<number>>
        this.correctResult = this.items[2][1]
        break;

      case "sequence":
        this.items = this.config.items.slice(0,-1) as Array<number>
        this.correctResult = (this.config.items as Array<number>)[this.config.items.length - 1] || NaN
        break;
    }
  }

  private _result() {
    this._timerLapService.setTimeout(0)
    this.mode = "result"
    this._cdr.markForCheck()
  }

  private _timeout() {
    this._updateResult({ isTimeout: true })
    this._result()
  }

  onKey(key: string) {
    if (this.mode !== "play") {
      return
    }

    switch (key) {
      case "BACKSPACE":
        this.userResult = this.userResult.slice(0,-1);
        break
      case ".":
        if (!this.userResult.match(/\./)) {
          this.userResult += key
        }
        break
      default:
        this.userResult += key
        break
    }
  }

  onButtonTouch() {
    if (this.mode === "play") {
      this._result()
      return
    }

    this._updateResult({ isFinish: true })
  }

}
