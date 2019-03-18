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
  IImageSequenceTrainerConfig,
  IImageSequenceTrainerResult,
} from "./image-sequence.trainer.interfaces"

@Component({
  selector: "trainer-image-sequence",
  templateUrl: "./image-sequence.trainer.component.html",
  styleUrls: [ "./image-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSequenceTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: IImageSequenceTrainerConfig

  result: IImageSequenceTrainerResult = {
    id: "image-sequence",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageSequenceTrainerResult>()

  private _updateResult(result: Partial<IImageSequenceTrainerResult>) {
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
    if (this.config.isGameMode) {
      return
    }
    this._updateResult({ isFinish: true })
  }

  check() {

  }
}
