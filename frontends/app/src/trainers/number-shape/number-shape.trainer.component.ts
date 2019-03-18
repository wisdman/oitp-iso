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
  INumberShapeTrainerConfig,
  INumberShapeTrainerResult,
} from "./number-shape.trainer.interfaces"

@Component({
  selector: "trainer-number-shape",
  templateUrl: "./number-shape.trainer.component.html",
  styleUrls: [ "./number-shape.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberShapeTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: INumberShapeTrainerConfig

  result: INumberShapeTrainerResult = {
    id: "number-shape",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberShapeTrainerResult>()

  private _updateResult(result: Partial<INumberShapeTrainerResult>) {
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
