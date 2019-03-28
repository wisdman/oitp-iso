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
  IQuestionTrainerConfig,
  IQuestionTrainerResult,
  IQuestionTrainerAnswer,
} from "./question.trainer.interfaces"

@Component({
  selector: "trainer-question",
  templateUrl: "./question.trainer.component.html",
  styleUrls: [ "./question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IQuestionTrainerConfig

  result: IQuestionTrainerResult = {
    id: "question",
    config: this.config,
    answers: [],
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IQuestionTrainerResult>()

  private _updateResult(result: Partial<IQuestionTrainerResult>) {
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

  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  get body() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.body)
  }

  sanitizeURL(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  onButtonClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  onAnswerClick(item: IQuestionTrainerAnswer) {
    item.isSelected = !item.isSelected

    if (!this.config.multiple && !this.config.button) {
      this._updateResult({
        isFinish: true,
      })
    }
  }
}
