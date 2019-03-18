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
  IWordsExclusionTrainerConfig,
  IWordsExclusionTrainerResult,
} from "./words-exclusion.trainer.interfaces"

@Component({
  selector: "trainer-words-exclusion",
  templateUrl: "./words-exclusion.trainer.component.html",
  styleUrls: [ "./words-exclusion.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsExclusionTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: IWordsExclusionTrainerConfig

  result: IWordsExclusionTrainerResult = {
    id: "words-exclusion",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsExclusionTrainerResult>()

  private _updateResult(result: Partial<IWordsExclusionTrainerResult>) {
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
