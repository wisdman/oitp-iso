import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ElementRef,
} from "@angular/core"

import { UUID } from "../../uuid"

import {
  IWordsColumnsTrainerConfig,
  IWordsColumnsTrainerResult,
} from "./words-columns.trainer.interfaces"

@Component({
  selector: "trainer-words-columns",
  templateUrl: "./words-columns.trainer.component.html",
  styleUrls: [ "./words-columns.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnsTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _el: ElementRef<HTMLElement>
  ){}

  current: number = 0

  get currentWord() {
    return this.config.words[this.current]
  }

  @Input()
  config: IWordsColumnsTrainerConfig = {
    id: "words-columns",
    uid: new UUID(),

    columns: [],
    words: [],
  }

  result: IWordsColumnsTrainerResult = {
    id: "icons-table",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsColumnsTrainerResult>()

  private _updateResult(result: Partial<IWordsColumnsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick(id: string, node: HTMLDivElement) {
    const currentId = this.currentWord.id

    window.requestAnimationFrame(() => {
      node.classList.remove("success", "error")
      if (id === currentId) {
        window.requestAnimationFrame(() => node.classList.add("success"))
      } else {
        window.requestAnimationFrame(() => node.classList.add("error"))
      }
    })

    let success= this.result.success
    let error = this.result.error

    if (id === currentId) {
      success++
    } else {
      error++
    }

    this.current++

    this._updateResult({
      success, error,
      isFinish: this.current >= this.config.words.length
    })
  }

  ngOnInit() {
    this.current = 0

    const columns = this.config.columns.length
    this._el.nativeElement.style.setProperty("--columns", `${columns}`)

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
