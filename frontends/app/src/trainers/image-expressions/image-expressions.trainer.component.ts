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
    private _cdr: ChangeDetectorRef,
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
    this._timerLapService.setTimeout(0)
    this._init()
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  srcSanitize(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  mode: "show" | "play" = "show"
  pages!: Array<{
    image: number
    data: string
  }>
  currentPage: number = -1

  get image() {
    if (this.currentPage < 0) {
      return ""
    }
    return `/expressions/${this.pages[this.currentPage].image}.jpg`
  }

  get data() {
    if (this.currentPage < 0) {
      return ""
    }
    return this.pages[this.currentPage].data
  }

  userData: string = ""

  private _init() {
    this.mode = "show"
    this.pages = this.config.pages
    this.currentPage = -1
    this._step()
  }

  private _play() {
    this.mode = "play"
    this.pages = this.config.pages // TODO: Random
    this.currentPage = -1
    this._step()
  }

  private _step() {
    this.currentPage++
    this._timerLapService.setTimeout(this.mode === "show" ? this.config.showTimeLimit : this.config.playTimeLimit)
  }

  private _timeout() {
    switch (this.mode) {
      case "show":
        if (this.currentPage >= this.pages.length - 1) {
          this._play()
        } else {
          this._step()
        }
        break

      case "play":
        if (this.currentPage >= this.pages.length - 1) {
          this._updateResult({ isFinish: true })
        } else {
          this._step()
        }
        break
    }
    this._cdr.markForCheck()
  }

  onKey(key: string) {
    if (this.mode !== "play") {
      return
    }

    switch (key) {
      case "BACKSPACE":
        this.userData = this.userData.slice(0,-1);
        return

      default:
        this.userData += key
        return
    }
  }

  onButtonTouch() {
    if (this.currentPage >= this.pages.length - 1) {
      this._updateResult({ isFinish: true })
    } else {
      this._step()
    }
    this._cdr.markForCheck()
  }

}
