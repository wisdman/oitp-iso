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
  IСolorsСlassificationTrainerItem,
  IСolorsСlassificationTrainerConfig,
  IСolorsСlassificationTrainerResult,
} from "./colors-classification.trainer.interfaces"

@Component({
  selector: "trainer-colors-classification",
  templateUrl: "./colors-classification.trainer.component.html",
  styleUrls: [ "./colors-classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class СolorsСlassificationTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: IСolorsСlassificationTrainerConfig

  result: IСolorsСlassificationTrainerResult = {
    id: "colors-classification",
    config: this.config,
    success: 0,
    error: 0,
    current: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IСolorsСlassificationTrainerResult>()

  private _updateResult(result: Partial<IСolorsСlassificationTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  colors!: Array<string>
  items!: Array<IСolorsСlassificationTrainerItem>

  get currentItem() {
    return this.items[this.result.current]
  }

  private _select(rgb: string) {
    if (this.currentItem.rgb === rgb) {
      this._updateResult({
        success: this.result.success + 1,
        current: this.result.current + 1,
        isFinish: this.result.current + 1 >= this.items.length,
      })
    } else {
      this._updateResult({
        error: this.result.error + 1,
        current: this.result.current + 1,
        isFinish: this.result.current + 1 >= this.items.length,
      })
    }
  }

  onClick(rgb: string) {
    this._select(rgb)
  }

  ngOnInit() {
    this.colors = this.config.items.slice().sort(() => Math.random() - 0.5).map(({rgb}) => rgb)
    this.items = this.config.items.slice().sort(() => Math.random() - 0.5)
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
      current: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
