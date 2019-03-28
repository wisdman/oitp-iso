import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  // HostListener,
} from "@angular/core"

import {
  ITextPairsTrainerConfig,
  ITextPairsTrainerResult,
} from "./text-pairs.trainer.interfaces"

@Component({
  selector: "trainer-text-pairs",
  templateUrl: "./text-pairs.trainer.component.html",
  styleUrls: [ "./text-pairs.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextPairsTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: ITextPairsTrainerConfig

  result: ITextPairsTrainerResult = {
    id: "text-pairs",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextPairsTrainerResult>()

  private _updateResult(result: Partial<ITextPairsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    // this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  click: number = 0

  onClick(event: Event) {
    this.click++
    (event.target as HTMLElement).style.backgroundColor = "#0f0"

    if (this.click >= this.config.pairs.length * 2) {
      this._updateResult({ isFinish: true })
    }
  }

  random() {
    return Math.floor(Math.random() * 20 + 1)
  }

  // private _init() {
  //   const pairs =
  // }

  // @HostListener("click")
  // onHostClick() {
  //   this._updateResult({ isFinish: true })
  // }


  // constructor(private _sanitizer: DomSanitizer){}

  // matrix: Array<number> = []

  // get matrixStyle() {
  //   const side = Math.sqrt(this.matrix.length)
  //   return this._sanitizer.bypassSecurityTrustStyle(`--side: ${side}`)
  // }

  // onClick(item: IItem) {
  //   if (item.value === (this.result.current + 1)) {
  //     this._updateResult({
  //       current: this.result.current + 1,
  //       success: this.result.success + 1,
  //     })
  //     item.success = true
  //   } else {
  //     this._updateResult({
  //       error: this.result.error + 1
  //     })
  //     item.error = true
  //     setTimeout(() => item.error = false, 1000)
  //   }

  //   if (this.result.current >= this.config.last) {
  //     this._updateResult({ isFinish: true })
  //   }
  // }

  // private _init() {
  //   this.matrix = this.config.matrix.map(item => ({...item}))
  //   this._updateResult({
  //     isFinish: false,
  //     success: 0,
  //     error: 0,
  //     current: 0,
  //   })
  // }


}
