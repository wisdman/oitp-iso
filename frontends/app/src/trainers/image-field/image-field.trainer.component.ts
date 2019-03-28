import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  HostListener,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  IImageFieldTrainerConfig,
  IImageFieldTrainerResult,
} from "./image-field.trainer.interfaces"

import {
  IGameFieldSize
} from "../interfaces"

interface IItem {
  image: string,
  dx: number,
  dy: number,
}

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IImageFieldTrainerConfig

  @Input()
  size!: IGameFieldSize

  result: IImageFieldTrainerResult = {
    id: "image-field",
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
  }

  constructor(private _sanitizer: DomSanitizer){}

  items!: Array<IItem>

  private _init() {
    const vertex = this.config.items.length
    const angle = 360 / vertex
    const radius = Math.min(this.size.width, this.size.height) / 4

    const theta = Math.floor(Math.random() * 100)

    const deltas = Array.from(Array(vertex), (_, i) => ({ theta: theta + (Math.PI * angle * i) / 180, r: radius }))
                        .map(({ r, theta }) => [
                          r * Math.cos(theta),
                          r * Math.sin(theta),
                        ])

    this.items = this.config
                     .items
                     .map((image, i) => {
                       const [dx, dy] = deltas[i]
                       const item: IItem = {
                         image,
                         dx, dy,
                       }
                       return item
                     })

  }

  sanitize(item: IItem) {
    return this._sanitizer.bypassSecurityTrustUrl(item.image)
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    this._updateResult({ isFinish: true })
  }
}
