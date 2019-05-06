import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  LapTimerService,
} from "../../services"

import {
  ImageFieldID,
  IImageFieldItem,
  IImageFieldTrainerConfig,
  IImageFieldTrainerResult,
} from "./image-field.trainer.interfaces"

import {
  IGameFieldSize
} from "../interfaces"

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _lapTimerService: LapTimerService,
    private _sanitizer: DomSanitizer,
  ){}

  @Input()
  config!: IImageFieldTrainerConfig

  @Input()
  size!: IGameFieldSize

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

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
    })
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
  }

  srcSanitize(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  items!: Array<IImageFieldItem>

  private _init() {
    const vertex = this.config.items.length
    const angle = 360 / vertex
    const radius = Math.min(this.size.width, this.size.height) / 4
    const randomTheta = Math.floor(Math.random() * 100)

    this.items = this.config.items.map((data, i) => {
      const theta = randomTheta + (Math.PI * angle * i) / 180
      const dx = radius * Math.cos(theta)
      const dy = radius * Math.sin(theta)
      const transform = `translate(${dx}px, ${dy}px)`
      return {data, transform}
    })
  }

  @HostListener("click")
  onHostClick() {
    this._updateResult({ isFinish: true })
  }
}
