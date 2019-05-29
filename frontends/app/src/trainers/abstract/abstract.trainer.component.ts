import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import { genRectangle, opsToPath } from "../../lib/svg/generator"

import {
  TimerService,
  FullscreenService,
  KeypadService,
} from "../../services"

import {
  ITrainerConfigs,
  ITrainerResults,
} from "../interfaces"

export interface SVGRectangle {
  x: number
  y: number

  width: number
  height: number

  path: string
  fillPath: string
}

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
    private _timerService: TimerService,
    private _sanitizer: DomSanitizer,

    public fullscreenService: FullscreenService,
    public keypadService: KeypadService,
  ){}

  mode: "loading" | "show" | "play" | "result" = "loading"

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

  markForCheck() {
    this._cdr.markForCheck()
  }

  private _style = getComputedStyle(this._elRef.nativeElement)

  getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  getCSSPropertyStringValue(property: string): string {
    return this._style.getPropertyValue(property)
  }

  setCSSProperty(property: string, value: string) {
    this._elRef.nativeElement.style.setProperty(property, value)
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

  setTimeout(value: number) {
    this._timerService.setLapTimeout(value)
  }

  private _lapTimerSubscriber!: Subscription

  width!: number
  height!: number

  ngOnInit() {
    this.mode = "loading"

    this._timerService.setLapTimeout(0)
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerService.lapTimeout.subscribe(() => this.timeout())

    const { width, height } = this._elRef.nativeElement.getBoundingClientRect()
    this.width = width
    this.height= height

    this.updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    } as Partial<R>)

    this.init()
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this.destroy()
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  genSVGRectangle(x: number, y: number, width: number, height: number): SVGRectangle {
    const sets = genRectangle(x, y, width, height, { fill: true })

    const pathSet = sets.find(set => set.type === "path")
    const path = pathSet && opsToPath(pathSet) || ""

    const fillPathSet = sets.find(set => set.type === "fillPath")
    const fillPath = fillPathSet && opsToPath(fillPathSet) || ""

    return { x, y, width, height, path, fillPath }
  }

  sanitizeUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  sanitizeHtml(value: string) {
    return this._sanitizer.bypassSecurityTrustHtml(value)
  }

  init() {}
  destroy() {}

  finish() {
    this.updateResult({ isFinish: true } as Partial<R>)
  }

  timeout() {
    this.updateResult({ isTimeout: true, isFinish: true } as Partial<R>)
  }


}