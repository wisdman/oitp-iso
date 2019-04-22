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
  ITextReadingTrainerConfig,
  ITextReadingTrainerResult,
} from "./text-reading.trainer.interfaces"

@Component({
  selector: "trainer-text-reading",
  templateUrl: "./text-reading.trainer.component.html",
  styleUrls: [ "./text-reading.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextReadingTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: ITextReadingTrainerConfig

  result: ITextReadingTrainerResult = {
    id: "text-reading",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextReadingTrainerResult>()

  private _updateResult(result: Partial<ITextReadingTrainerResult>) {
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

  get data() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.data)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }











}
