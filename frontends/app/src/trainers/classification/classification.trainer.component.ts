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

import { DomSanitizer } from "@angular/platform-browser"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerResult,
} from "./classification.trainer.interfaces"

@Component({
  selector: "trainer-classification",
  templateUrl: "./classification.trainer.component.html",
  styleUrls: [ "./classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IClassificationTrainerConfig

  result: IClassificationTrainerResult = {
    id: "classification",
    config: this.config,

    success: 0,
    error: 0,
    current: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IClassificationTrainerResult>()

  private _updateResult(result: Partial<IClassificationTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
      current: 0,
    })
  }

  constructor(private _sanitizer: DomSanitizer){}

  groups: Array<string> = []

  get matrixStyle() {
    const columns = this.groups.length
    return this._sanitizer.bypassSecurityTrustStyle(`--columns: ${columns}`)
  }

  private _init() {
    this.groups = [...new Set(this.config.items.map(({group}) => group))]
  }

  get currentItem() {
    return this.config.items[this.result.current]
  }

  private _select(group: string) {
    if (this.currentItem.group === group) {
      this._updateResult({
        success: this.result.success + 1,
        current: this.result.current + 1,
        isFinish: this.result.current + 1 >= this.config.items.length,
      })
    } else {
      this._updateResult({
        error: this.result.error + 1,
        current: this.result.current + 1,
        isFinish: this.result.current + 1 >= this.config.items.length,
      })
    }
  }

  onClick(group: string) {
    console.log(group)
    this._select(group)
  }
}
