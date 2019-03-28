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
  ITextSortTrainerConfig,
  ITextSortTrainerResult,
} from "./text-sort.trainer.interfaces"

import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop"

@Component({
  selector: "trainer-text-sort",
  templateUrl: "./text-sort.trainer.component.html",
  styleUrls: [ "./text-sort.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSortTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: ITextSortTrainerConfig

  result: ITextSortTrainerResult = {
    id: "text-sort",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextSortTrainerResult>()

  private _updateResult(result: Partial<ITextSortTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    if (this.config.mode === 'play') {
      return
    }
    this._updateResult({ isFinish: true })
  }

  onButtonClick() {
    this._updateResult({ isFinish: true })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.config.items, event.previousIndex, event.currentIndex)
  }
}
