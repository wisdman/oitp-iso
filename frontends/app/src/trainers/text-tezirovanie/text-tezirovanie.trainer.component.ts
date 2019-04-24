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
  @Input()
  config!: ITextTezirovanieTrainerConfig

  result: ITextTezirovanieTrainerResult = {
    id: "text-tezirovanie",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextTezirovanieTrainerResult>()

  private _updateResult(result: Partial<ITextTezirovanieTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    // console.log(this.config)
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
    return this._sanitizer.bypassSecurityTrustHtml(this.config.data)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }











}
