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

import { DomSanitizer } from "@angular/platform-browser"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

import {
  ITextReadingTrainerConfig,
  ITextReadingTrainerResult,
} from "./text-reading.trainer.interfaces"

@Component({
  selector: "trainer-text-reading",
  templateUrl: "./text-reading.trainer.component.html",
  styleUrls: [ "./text-reading.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextReadingTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _sanitizer: DomSanitizer,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: ITextReadingTrainerConfig

  result: ITextReadingTrainerResult = {
    id: "text-reading",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextReadingTrainerResult>()

  private _updateResult(result: Partial<ITextReadingTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
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

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }


  get data() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.data)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }











}
