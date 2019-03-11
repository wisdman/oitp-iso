import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import {
  IResultsTrainerConfig,
  IResultsTrainerResult,
} from "./results.trainer.interfaces"

@Component({
  selector: "trainer-results",
  templateUrl: "./results.trainer.component.html",
  styleUrls: [ "./results.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IResultsTrainerConfig

  result:  IResultsTrainerResult = {
    id: "results",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IResultsTrainerResult>()

  private _updateResult(result: Partial<IResultsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnInit() {
    this._updateResult({
      isFinish: false,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
