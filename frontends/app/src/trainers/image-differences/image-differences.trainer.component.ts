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

import {
  IImageDifferencesTrainerConfig,
  IImageDifferencesTrainerResult,
} from "./image-differences.trainer.interfaces"

import { DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: "trainer-image-differences",
  templateUrl: "./image-differences.trainer.component.html",
  styleUrls: [ "./image-differences.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDifferencesTrainerComponent implements OnInit, OnChanges {

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

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this.mode = "show"
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  mode: "show" | "play" = "show"

  constructor(private _sanitizer: DomSanitizer){}

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
