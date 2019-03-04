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
  IImageConstructorTrainerConfig,
  IImageConstructorTrainerResult,
} from "./image-constructor.trainer.interfaces"

@Component({
  selector: "trainer-image-constructor",
  templateUrl: "./image-constructor.trainer.component.html",
  styleUrls: [ "./image-constructor.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageConstructorTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  mode: "show" | "fill" = "show"

  @Input()
  config: IImageConstructorTrainerConfig = {
    id: "image-constructor",
    uid: new UUID(),
    matrix: [],
  }

  result: IImageConstructorTrainerResult = {
    id: "image-constructor",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageConstructorTrainerResult>()

  private _updateResult(result: Partial<IImageConstructorTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  getDataUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
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
}
