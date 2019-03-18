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
  IWordsShapeTrainerConfig,
  IWordsShapeTrainerResult,
} from "./words-shape.trainer.interfaces"

@Component({
  selector: "trainer-words-shape",
  templateUrl: "./words-shape.trainer.component.html",
  styleUrls: [ "./words-shape.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsShapeTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: IWordsShapeTrainerConfig

  result: IWordsShapeTrainerResult = {
    id: "words-shape",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsShapeTrainerResult>()

  private _updateResult(result: Partial<IWordsShapeTrainerResult>) {
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
