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

import { UUID } from "../../uuid"

import {
  IArticleTrainerConfig,
  IArticleTrainerResult,
} from "./article.trainer.interfaces"

@Component({
  selector: "trainer-article",
  templateUrl: "./article.trainer.component.html",
  styleUrls: [ "./article.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  @Input()
  config: IArticleTrainerConfig = {
    id: "article",
    uid: new UUID(),
    header: "",
    body: "",
    button: "",
  }

  result: IArticleTrainerResult = {
    id: "article",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IArticleTrainerResult>()

  get body() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.body)
  }

  private _updateResult(result: Partial<IArticleTrainerResult>) {
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
