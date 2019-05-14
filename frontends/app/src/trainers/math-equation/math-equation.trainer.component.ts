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
  IMathEquationTrainerConfig,
  IMathEquationTrainerResult,
  MathEquationTrainerID,
} from "./math-equation.trainer.interfaces"

@Component({
  selector: "trainer-math-equation",
  templateUrl: "./math-equation.trainer.component.html",
  styleUrls: [ "./math-equation.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathEquationTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IMathEquationTrainerConfig

  result: IMathEquationTrainerResult = {
    id: MathEquationTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMathEquationTrainerResult>()

  private _updateResult(result: Partial<IMathEquationTrainerResult>) {
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
