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
  Renderer2,
  SimpleChanges,
} from "@angular/core"

import { HttpClient } from  "@angular/common/http"

import { DomSanitizer } from "@angular/platform-browser"

import { Subscription } from "rxjs"

import {
  CarpetService,
  FullscreenService,
  KeypadService,
  PointerService,
  TimerService,
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
    private _renderer: Renderer2,
    private _sanitizer: DomSanitizer,

    public carpetService: CarpetService,
    public fullscreenService: FullscreenService,
    public httpClient: HttpClient,
    public keypadService: KeypadService,
    public pointerService: PointerService,
    public timerService: TimerService,
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
    this.result = {...this.result, ...result, uuid: this.config.uuid, training: this.config.training }
    if (this.result.isFinish) {
      this.resultValueChange.emit(this.result)
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

  getCSSPropertyStringValue(property: string): string {
    return this._style.getPropertyValue(property)
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


  // Renderer2
  appendChild(newChild: Node, parent?: Node) {
    this._renderer.appendChild(parent || this._elRef.nativeElement, newChild)
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
    this.fullscreenService.lock()

    // Enable loader
    this.loading = true

    // Lap timer subscribe
    this.timerService.setLapTimeout(0)
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this.timerService.lapTimeout.subscribe(() => this.timeout())

    // Reset results
    this.updateResult({
      isFinish: false,
      isTimeout: false,
      result: null,
      time: 0,
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
    this._lapTimerSubscriber.unsubscribe()

    // Destroy trainer
    this.destroy()

    this.fullscreenService.unlock()
  }

  // Default functions
  init() {}
  destroy() {}
  finish() { this.updateResult({ isFinish: true } as Partial<R>) }
  timeout() { this.updateResult({ isTimeout: true } as Partial<R>) }
}