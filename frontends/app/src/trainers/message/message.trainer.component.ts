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
  IMessageTrainerConfig,
  IMessageTrainerResult,
} from "./message.trainer.interfaces"

@Component({
  selector: "trainer-message",
  templateUrl: "./message.trainer.component.html",
  styleUrls: [ "./message.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  get content() {
    const header = this.config.header ? `<h1>${this.config.header}</h1>` : ""
    const body = this.config.body || ""
    return this._sanitizer.bypassSecurityTrustHtml(header + body)
  }

  @Input()
  config!: IMessageTrainerConfig

  result: IMessageTrainerResult = {
    id: "message",
    config: this.config,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMessageTrainerResult>()

  private _updateResult(result: Partial<IMessageTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick() {
    this._updateResult({ isFinish: true })
  }

  ngOnInit() {
    this._updateResult({})
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
