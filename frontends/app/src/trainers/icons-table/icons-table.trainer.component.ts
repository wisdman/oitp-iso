import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
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
  IIconsTableTrainerConfig,
  IIconsTableTrainerResult,
} from "./icons-table.trainer.interfaces"

@Component({
  selector: "trainer-icons-table",
  templateUrl: "./icons-table.trainer.component.html",
  styleUrls: [ "./icons-table.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsTableTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _sanitizer: DomSanitizer,
    private _el: ElementRef<HTMLElement>
  ){}

  mode: "show" | "fill" = "show"

  @Input()
  config: IIconsTableTrainerConfig = {
    id: "icons-table",
    uid: new UUID(),

    mode: "show",
    columns: 0,
    rows: 0,

    items: [],
    matrix: [],
  }

  result: IIconsTableTrainerResult = {
    id: "icons-table",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IIconsTableTrainerResult>()

  private _updateResult(result: Partial<IIconsTableTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  getDataUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  onClick() {
    if (this.mode === 'show') {
      this.mode = 'fill'
    } else {
      this._updateResult({
        isFinish: true,
      })
    }
  }

  ngOnInit() {
    const columns = this.config.columns
    const rows = this.config.rows
    const items = this.config.items.length

    const max = Math.max(columns + 1, rows + 1, items)

    this._el.nativeElement.style.setProperty("--columns", `${columns}`)
    this._el.nativeElement.style.setProperty("--rows", `${rows}`)
    this._el.nativeElement.style.setProperty("--items", `${items}`)
    this._el.nativeElement.style.setProperty("--max", `${max}`)

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
