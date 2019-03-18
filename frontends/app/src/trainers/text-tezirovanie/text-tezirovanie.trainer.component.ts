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
  ITextTezirovanieTrainerConfig,
  ITextTezirovanieTrainerResult,
} from "./text-tezirovanie.trainer.interfaces"

@Component({
  selector: "trainer-text-tezirovanie",
  templateUrl: "./text-tezirovanie.trainer.component.html",
  styleUrls: [ "./text-tezirovanie.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTezirovanieTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  get content() {
    const header = this.config.header ? `<h1>${this.config.header}</h1>` : ""
    const body = this.config.body || ""
    return this._sanitizer.bypassSecurityTrustHtml(header + body)
  }

  @Input()
  config!: ITextTezirovanieTrainerConfig

  result: ITextTezirovanieTrainerResult = {
    id: "text-tezirovanie",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextTezirovanieTrainerResult>()

  private _updateResult(result: Partial<ITextTezirovanieTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  ngOnInit() {
    // console.log(this.config)
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
