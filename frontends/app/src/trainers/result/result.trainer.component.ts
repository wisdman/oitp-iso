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
  IResultTrainerConfig,
  IResultTrainerResult,
} from "./result.trainer.interfaces"

@Component({
  selector: "trainer-result",
  templateUrl: "./result.trainer.component.html",
  styleUrls: [ "./result.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IResultTrainerConfig

  result: IResultTrainerResult = {
    id: "result",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IResultTrainerResult>()

  private _updateResult(result: Partial<IResultTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._updateResult({ isFinish: false })
  }

  onClick() {
    this._updateResult({ isFinish: true })
  }
}
