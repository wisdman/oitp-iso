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
  IWordsClassificationTrainerConfig,
  IWordsClassificationTrainerResult,
} from "./words-classification.trainer.interfaces"

interface IItem {
  group: string
  title: string
}

@Component({
  selector: "trainer-words-classification",
  templateUrl: "./words-classification.trainer.component.html",
  styleUrls: [ "./words-classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsClassificationTrainerComponent implements OnInit, OnChanges {

  constructor(private _sanitizer: DomSanitizer){}

  @Input()
  config!: IWordsClassificationTrainerConfig

  result: IWordsClassificationTrainerResult = {
    id: "words-classification",
    config: this.config,
    success: 0,
    error: 0,
    current: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsClassificationTrainerResult>()

  private _updateResult(result: Partial<IWordsClassificationTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  groups: Array<string> = []
  items: Array<IItem> = []

  get currentItem() {
    return this.items[this.result.current]
  }

  get matrixStyle() {
    const columns = this.groups.length
    return this._sanitizer.bypassSecurityTrustStyle(`--columns: ${columns}`)
  }

  private _select(group: string) {
    if (this.currentItem.group === group) {
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

  onClick(group: string) {
    console.log(group)
    this._select(group)
  }

  ngOnInit() {
    this.groups = this.config.items
                             .map(({group}) => group)

    this.items = this.config.items
                            .map(({group, items}) => items.map((title) => ({group, title})))
                            .flat()
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
