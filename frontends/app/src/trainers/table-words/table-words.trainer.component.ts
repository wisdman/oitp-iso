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
  ITableWordsTrainerConfig,
  ITableWordsTrainerResult,
  TableWordsTrainerID,
} from "./table-words.trainer.interfaces"

@Component({
  selector: "trainer-table-words",
  templateUrl: "./table-words.trainer.component.html",
  styleUrls: [ "./table-words.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWordsTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: ITableWordsTrainerConfig

  result: ITableWordsTrainerResult = {
    id: TableWordsTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITableWordsTrainerResult>()

  private _updateResult(result: Partial<ITableWordsTrainerResult>) {
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

  isResultMode: boolean = true

  private _init() {

  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  onButtonClick() {
    this._updateResult({ isFinish: true })
  }

}
