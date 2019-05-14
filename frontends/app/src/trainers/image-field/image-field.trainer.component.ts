import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
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
  ImageFieldID,
  IImageFieldItem,
  IImageFieldTrainerConfig,
  IImageFieldTrainerResult,
} from "./image-field.trainer.interfaces"

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _el: ElementRef<HTMLElement>,
    private _sanitizer: DomSanitizer,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IImageFieldTrainerConfig

  result: IImageFieldTrainerResult = {
    id: ImageFieldID,
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageFieldTrainerResult>()

  private _updateResult(result: Partial<IImageFieldTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
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

  srcSanitize(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  items!: Array<IImageFieldItem>

  private _init() {
    const {width, height} =  this._el.nativeElement.getBoundingClientRect()

    const vertex = this.config.items.length
    const angle = 360 / vertex
    const radius = Math.min(width, height) / 4
    const randomTheta = Math.floor(Math.random() * 100)

    this.items = this.config.items.map((data, i) => {
      const theta = randomTheta + (Math.PI * angle * i) / 180
      const dx = radius * Math.cos(theta)
      const dy = radius * Math.sin(theta)
      const transform = `translate(${dx}px, ${dy}px)`
      return {data: `/icons/${data}.svg`, transform}
    })
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  @HostListener("click")
  onHostClick() {
    this._updateResult({ isFinish: true })
  }
}
