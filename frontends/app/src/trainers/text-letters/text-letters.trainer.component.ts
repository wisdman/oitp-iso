import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

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
export class TextLettersTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _el: ElementRef<HTMLElement>,
    private _sanitizer: DomSanitizer,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: ITextLettersTrainerConfig

  result: ITextLettersTrainerResult = {
    id: "text-letters",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextLettersTrainerResult>()

  private _updateResult(result: Partial<ITextLettersTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.timeLimit)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }




  letters: Array<string> = []
  comb: string = ""
  mode: "show" | "fill" = "show"

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
    console.dir(1111111)
    if (this.mode === 'show') {
      this.letters = this.config
                          .data
                          .split(" ")
                          .map(word => word.charAt(0))
                          .filter(letter => /^[А-Яа-яЁё]$/i.test(letter))
                          .sort(() => Math.random() - 0.5)

      this.mode = 'fill'
      return
    }
  }

  private _init() {
    const columns = this.letters.length

    this._el.nativeElement.style.setProperty("--columns", `${columns}`)

    this.comb = ""
    this.letters = []
    this.mode = "show"
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }
}
