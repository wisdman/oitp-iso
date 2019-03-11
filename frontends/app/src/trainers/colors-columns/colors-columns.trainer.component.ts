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

import {
  IColorsColumnsTrainerConfig,
  IColorsColumnsTrainerResult,
} from "./colors-columns.trainer.interfaces"

@Component({
  selector: "trainer-colors-columns",
  templateUrl: "./colors-columns.trainer.component.html",
  styleUrls: [ "./colors-columns.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsColumnsTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _el: ElementRef<HTMLElement>
  ){}

  current: number = 0

  get currentColor() {
    return this.config.colors[this.current]
  }

  @Input()
  config!: IColorsColumnsTrainerConfig

  result: IColorsColumnsTrainerResult = {
    id: "colors-columns",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IColorsColumnsTrainerResult>()

  private _updateResult(result: Partial<IColorsColumnsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick(rgb: string, node: HTMLDivElement) {
    const currentRGB = this.currentColor.rgb

    window.requestAnimationFrame(() => {
      node.classList.remove("success", "error")
      if (rgb === currentRGB) {
        window.requestAnimationFrame(() => node.classList.add("success"))
      } else {
        window.requestAnimationFrame(() => node.classList.add("error"))
      }
    })

    let success= this.result.success
    let error = this.result.error

    if (rgb === currentRGB) {
      success++
    } else {
      error++
    }

    this.current++

    this._updateResult({
      success, error,
      isFinish: this.current >= this.config.colors.length
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
