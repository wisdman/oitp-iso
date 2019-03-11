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
} from "./question.trainer.interfaces"

@Component({
  selector: "trainer-question",
  templateUrl: "./question.trainer.component.html",
  styleUrls: [ "./question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  @Input()
  config!: IQuestionTrainerConfig

  result: IQuestionTrainerResult = {
    id: "question",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IQuestionTrainerResult>()

  get body() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.body)
  }

  private _updateResult(result: Partial<IQuestionTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  ngOnInit() {
    this._updateResult({
      isFinish: false,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
