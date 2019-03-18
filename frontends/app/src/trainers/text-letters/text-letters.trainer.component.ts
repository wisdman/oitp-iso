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

import {
  ITextLettersTrainerConfig,
  ITextLettersTrainerResult,
} from "./text-letters.trainer.interfaces"

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent implements OnInit, OnChanges {

  constructor(
    private _sanitizer: DomSanitizer,
    private _el: ElementRef<HTMLElement>
  ){}

  letters: Array<string> = []
  comb: string = ""
  mode: "show" | "fill" = "show"

  @Input()
  config!: ITextLettersTrainerConfig

  result: ITextLettersTrainerResult = {
    id: "text-letters",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextLettersTrainerResult>()

  private _updateResult(result: Partial<ITextLettersTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  getDataUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  onLetterClick(item: string) {
    const index = this.letters.indexOf(item);
    this.letters.splice(index, 1);

    this.comb += item

    if (this.letters.length <= 0) {
      this._updateResult({
        isFinish: true,
      })
    }
  }

  onClick() {
    if (this.mode === 'show') {
      this.letters = this.config
                          .sentence
                          .split(" ")
                          .map(word => word.charAt(0))
                          .filter(letter => /^[А-Яа-яЁё]$/i.test(letter))
                          .sort(() => Math.random() - 0.5)

      this.mode = 'fill'
      return
    }
  }

  ngOnInit() {
    const columns = this.letters.length

    this._el.nativeElement.style.setProperty("--columns", `${columns}`)

    this.comb = ""
    this.letters = []
    this.mode = "show"

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
