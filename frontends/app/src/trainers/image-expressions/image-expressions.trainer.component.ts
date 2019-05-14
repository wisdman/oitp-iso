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
  IImageExpressionsTrainerConfig,
  IImageExpressionsTrainerResult,
  ImageExpressionsTrainerID,
} from "./image-expressions.trainer.interfaces"

@Component({
  selector: "trainer-image-expressions",
  templateUrl: "./image-expressions.trainer.component.html",
  styleUrls: [ "./image-expressions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _sanitizer: DomSanitizer,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IImageExpressionsTrainerConfig

  result: IImageExpressionsTrainerResult = {
    id: ImageExpressionsTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageExpressionsTrainerResult>()

  private _updateResult(result: Partial<IImageExpressionsTrainerResult>) {
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

  get image() {
    return `/expressions/${this.config.image}.jpg`
  }

  srcSanitize(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

}
