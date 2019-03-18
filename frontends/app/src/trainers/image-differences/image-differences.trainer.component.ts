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
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageDifferencesTrainerResult>()

  private _updateResult(result: Partial<IImageDifferencesTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnInit() {
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
