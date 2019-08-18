import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { Subscription } from "rxjs"

import { FullscreenService, KeypadService, PointerService, TimerService, TrainingService } from "../../services"
import { ITrainerConfigs, ITrainerMode, ITrainerResult } from "../interfaces"

@Component({
  selector: "trainer-abstract",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractTrainer<C extends ITrainerConfigs> implements OnInit, OnDestroy, OnChanges {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
    private _sanitizer: DomSanitizer,

    public fullscreenService: FullscreenService,
    public keypadService: KeypadService,
    public pointerService: PointerService,
    public timerService: TimerService,
    public trainingService: TrainingService,
  ){
    // Add global class
    this._elRef.nativeElement.classList.add("trainer")
  }

  // === Forse fullscreen ===
  forseRedraw() {
    this.fullscreenService.forseRedraw()
  }

  // === Config and results ===
  @Input("config")
  config!: C

  private _result!: ITrainerResult

  @Output("result")
  resultValueChange = new EventEmitter<ITrainerResult>()

  private _updateResult(result: Partial<ITrainerResult>) {
    this._result = {
      ...this._result,
      ...result,
      training: this.config.training,
      idx: this.config.idx,
    }
  }

  // === Style reading ===
  private _style = getComputedStyle(this._elRef.nativeElement)

  get fontStyle(): string {
    return `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`
  }

  getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }


  // === Style manipulation ===
  setCSSProperty(property: string, value: string) {
    window.requestAnimationFrame(() =>{
      this._elRef.nativeElement.style.setProperty(property, value)
    })
  }


  // === Change Detector ===
  markForCheck() {
    this._cdr.markForCheck()
  }
  detectChanges() {
    this._cdr.detectChanges()
  }


  // === Sanitizer ===
  sanitizeUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }
  sanitizeHtml(value: string) {
    return this._sanitizer.bypassSecurityTrustHtml(value)
  }


  // === Timer ===
  setTimeout(value: number) {
    this.timerService.setLapTimeout(value)
  }


  // === Time Meter ===
  private _time!: number
  initTimeMeter() {
    this._time = Number(new Date())
  }
  finishTimeMeter(type: ITrainerMode) {
    if (this._time <= 0) {
      return
    }

    switch (type) {
      case "play":
        this._updateResult({ playTime: Number(new Date()) - this._time })
        break

      case "preview":
        this._updateResult({ previewTime: Number(new Date()) - this._time })
        break
    }

    this._time = 0
  }

  // === Matrix size ===
  matrixWidth: number = 0
  matrixHeight: number = 0
  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }


  // === Game mode ===
  mode: ITrainerMode = "init"

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this.mode = "init"
    this.fullscreenService.lock()

    // Lap timer subscribe
    this.setTimeout(0)
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this.timerService.lapTimeout.subscribe(() => this.timeout())

    // Reset results
    this._updateResult({
      result: null,
      playTime: 0,
      previewTime: 0,
    })

    // Reset time meter
    this._time = 0

    // Init trainer
    this.init()

    // Auto start trainer
    if (this.mode === "init") {
      this.start()
    }
  }

  ngOnChanges(sc: SimpleChanges ) {
    // Reload if config change
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    // Lap timer unsubscribe
    this._lapTimerSubscriber.unsubscribe()
    this.setTimeout(0)

    // Destroy trainer
    this.destroy()

    this.fullscreenService.unlock()
  }

  // Default functions
  init() {}
  destroy() {}
  timeout() {}

  preview(timeLimit: number = this.config.previewTimeLimit || 0) {
    this.setTimeout(timeLimit)
    this.finishTimeMeter(this.mode)
    this.initTimeMeter()
    this.mode = "preview"
    this.markForCheck()
  }

  start(timeLimit: number = this.config.playTimeLimit) {
    this.setTimeout(timeLimit)
    this.finishTimeMeter(this.mode)
    this.initTimeMeter()
    this.mode = "play"
    this.markForCheck()
  }

  result() {
    this.setTimeout(0)
    this.finishTimeMeter(this.mode)
    this.mode = "result"
    this.markForCheck()
  }

  finish(result: number | boolean | null = null) {
    this.setTimeout(0)
    this.finishTimeMeter(this.mode)

    this._updateResult({
      result: result === null ? null
                              : result === false ? 0
                                                 : result === true ? 100
                                                                   : result < 0 ? 0
                                                                                : result > 100 ? 100
                                                                                               : Math.round(result)
    })

    this.resultValueChange.emit(this._result)
  }
}


