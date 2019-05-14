import {
  Component,
  ChangeDetectionStrategy,
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

  private _init() {

  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

}
