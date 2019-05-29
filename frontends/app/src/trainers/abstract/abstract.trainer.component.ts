import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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

import {
  TimerService,
  PointerService,
  KeypadService,
} from "../../services"

import {
  ITrainerConfigs,
  ITrainerResults,
} from "../interfaces"

@Component({
  selector: "trainer-abstract",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractTrainerComponent<C extends ITrainerConfigs, R extends ITrainerResults>
implements OnInit, OnDestroy, OnChanges {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
    private _sanitizer: DomSanitizer,
    private _timerService: TimerService,

    public pointerService: PointerService,
    public keypadService: KeypadService,
  ){
    // Add global class
    this._elRef.nativeElement.classList.add("trainer")
  }


  // === Config and results ===
  @Input("config")
  config!: C

  result!: R

  @Output("result")
  resultValueChange = new EventEmitter<R>()

  updateResult(result: Partial<R>) {
    this.result = {...this.result, config: this.config, ...result}
    if (this.result.isFinish) {
      this.resultValueChange.emit(this.result)
    }
  }


  // === Style reading ===
  private _style = getComputedStyle(this._elRef.nativeElement)

  getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  getCSSPropertyStringValue(property: string): string {
    return this._style.getPropertyValue(property)
  }

  getTextWidth(value: string): number
  getTextWidth(value: Array<string>): Array<number>
  getTextWidth(value: string | Array<string>): number | Array<number> {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return Array.isArray(value) ? [] : 0
    }

    context.font = `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`

    if (Array.isArray(value)) {
      return value.map(text => context.measureText(text).width)
    }

    return context.measureText(value).width
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
    this._timerService.setLapTimeout(value)
  }
  getTimer(limit: number) {
    return this._timerService.getCustomTimer(limit)
  }

  // === Matrix size ===
  matrixWidth: number = 0
  matrixHeight: number = 0
  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }


  // === Native element size ===
  width: number = 0
  height: number = 0


  // === Loading status ===
  private _isLoading: boolean = true

  @Output()
  loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input()
  get loading(){
    return this._isLoading
  }

  set loading(value: boolean) {
    this._isLoading = value;
    this.loadingChange.emit(this._isLoading)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    // Enable loader
    this.loading = true

    // Lap timer subscribe
    this._timerService.setLapTimeout(0)
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerService.lapTimeout.subscribe(() => this.timeout())

    // Reset results
    this.updateResult({
      isTimeout: false,
      isFinish: false,
      success: 0,
      error: 0,
    } as Partial<R>)

    // Set native element size
    const { width, height } = this._elRef.nativeElement.getBoundingClientRect()
    this.width = width
    this.height= height

    // Init trainer
    this.init()

    // Disable loader
    this.loading = false
  }

  ngOnChanges(sc: SimpleChanges ) {
    // Reload if config change
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    // Lap timer unsubscribe
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()

    // Destroy trainer
    this.destroy()
  }

  // Default functions
  init() {}
  destroy() {}
  finish() { this.updateResult({ isFinish: true } as Partial<R>) }
  timeout() { this.updateResult({ isTimeout: true } as Partial<R>) }
}