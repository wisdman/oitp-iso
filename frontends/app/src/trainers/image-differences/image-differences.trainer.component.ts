import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
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
  IImageDifferencesTrainerConfig,
  IImageDifferencesTrainerResult,
} from "./image-differences.trainer.interfaces"

@Component({
  selector: "trainer-image-differences",
  templateUrl: "./image-differences.trainer.component.html",
  styleUrls: [ "./image-differences.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDifferencesTrainerComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private _timerLapService: TimerLapService,
    private _sanitizer: DomSanitizer,
  ){}

  @Input()
  config!: IImageDifferencesTrainerConfig

  result: IImageDifferencesTrainerResult = {
    id: "image-differences",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageDifferencesTrainerResult>()

  private _updateResult(result: Partial<IImageDifferencesTrainerResult>) {
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
    this.mode = "show"
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  mode: "show" | "play" = "show"



  get imageA() {
    return this._sanitizer.bypassSecurityTrustUrl( `/differences/${this.config.imageA}.svg` )
  }

  get imageB() {
    return this._sanitizer.bypassSecurityTrustUrl( `/differences/${this.config.imageB}.svg` )
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    if (this.mode === "show") {
      this.mode = "play"
    } else {
       this._updateResult({ isFinish: true })
    }
  }
}
