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
  INumberExclusionTrainerConfig,
  INumberExclusionTrainerResult,
} from "./number-exclusion.trainer.interfaces"

interface IItem {
  value: number,
  dx: number,
  dy: number,
}

@Component({
  selector: "trainer-number-exclusion",
  templateUrl: "./number-exclusion.trainer.component.html",
  styleUrls: [ "./number-exclusion.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberExclusionTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: INumberExclusionTrainerConfig

  result: INumberExclusionTrainerResult = {
    id: "number-exclusion",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberExclusionTrainerResult>()

  private _updateResult(result: Partial<INumberExclusionTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  items: Array<IItem> = []

  private _select(value: number) {
    if (this.config.items[this.config.items.length - 1] === value) {
      this._updateResult({ success: 1, isFinish: true })
    } else {
      this._updateResult({ error: 1, isFinish: true })
    }
  }

  onClick(value: number) {
    this._select(value)
  }

  ngOnInit() {
    this.items = this.config.items
                            .slice()
                            .map((value) => ({ value, dx: 0, dy: 0}))

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
}
