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

interface IItem {
  image: string
  dx: number,
  dy: number,
}

function RandomInt(min: number = 0, max?: number) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent implements OnInit, OnChanges {

  constructor(private _sanitizer: DomSanitizer){}

  @Input()
  config!: IImageFieldTrainerConfig

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

  items: Array<IItem> = []

  dataUrl(item: IItem) {
    return this._sanitizer.bypassSecurityTrustUrl(item.image)
  }

  ngOnInit() {
    this.items = this.config.items
                            .map((image,i) => ({
                              image,
                              dx: RandomInt(0, 200) + i*120,
                              dy: RandomInt(0, 100)+ i*120,
                            }))

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    this._updateResult({ isFinish: true })
  }
}
