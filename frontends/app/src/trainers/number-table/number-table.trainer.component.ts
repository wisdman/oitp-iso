import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { UUID } from "../../uuid"

import {
  INumberTableTrainerConfig,
  INumberTableTrainerResult,
  INumberTableTrainerItem,
} from "./number-table.trainer.interfaces"

@Component({
  selector: "trainer-number-table",
  templateUrl: "./number-table.trainer.component.html",
  styleUrls: [ "./number-table.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberTableTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _el: ElementRef<HTMLElement>
  ){}

  @Input()
  config: INumberTableTrainerConfig = {
    id: "number-table",
    uid: new UUID(),

    columns: 0,
    rows: 0,
    last: 0,

    matrix: [],
  }

  result: INumberTableTrainerResult = {
    id: "number-table",
    config: this.config,
    success: 0,
    error: 0,
    step: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberTableTrainerResult>()

  private _updateResult(result: Partial<INumberTableTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick(item: INumberTableTrainerItem) {
    if (item.value === (this.result.step + 1)) {
      this._updateResult({
        step: this.result.step + 1,
        success: this.result.success + 1
      })
      item.success = true
    } else {
      this._updateResult({
        error: this.result.error + 1
      })
      item.error = true
      setTimeout(() => item.error = false, 1000)
    }

    if (this.result.step >= this.config.last) {
      this._updateResult({ isFinish: true })
    }
  }

  ngOnInit() {
    this._el.nativeElement.style.setProperty("--columns", `${this.config.columns}`)
    this._el.nativeElement.style.setProperty("--rows", `${this.config.rows}`)
    this._el.nativeElement.style.setProperty("--max", `${Math.max(this.config.columns, this.config.rows)}`)

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
      step: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
