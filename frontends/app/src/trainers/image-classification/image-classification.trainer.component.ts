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
  IImageClassificationTrainerConfig,
  IImageClassificationTrainerResult,
} from "./image-classification.trainer.interfaces"

@Component({
  selector: "trainer-image-classification",
  templateUrl: "./image-classification.trainer.component.html",
  styleUrls: [ "./image-classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageClassificationTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: IImageClassificationTrainerConfig

  result: IImageClassificationTrainerResult = {
    id: "image-classification",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageClassificationTrainerResult>()

  private _updateResult(result: Partial<IImageClassificationTrainerResult>) {
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
