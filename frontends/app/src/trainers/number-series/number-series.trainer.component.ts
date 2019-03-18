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
  INumberSeriesTrainerConfig,
  INumberSeriesTrainerResult,
} from "./number-series.trainer.interfaces"

@Component({
  selector: "trainer-number-series",
  templateUrl: "./number-series.trainer.component.html",
  styleUrls: [ "./number-series.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberSeriesTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: INumberSeriesTrainerConfig

  result: INumberSeriesTrainerResult = {
    id: "number-series",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberSeriesTrainerResult>()

  private _updateResult(result: Partial<INumberSeriesTrainerResult>) {
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
