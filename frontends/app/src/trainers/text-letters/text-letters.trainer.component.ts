import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

import {
  ITextLettersTrainerConfig,
  ITextLettersTrainerResult,
} from "./text-letters.trainer.interfaces"

const RUNES = [
  ..."АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
]

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
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
    this._timerLapService.setTimeout(this.config.showTimeLimit)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  mode: "show" | "play" | "result" = "show"

  data: string = ""
  runes: Array<{
    rune: string,
    user?: string,
  }> = []

  private _init() {
    this.mode = "show"
    this.data = this.config.data
    this.runes = this.data
                     .split(/\s/)
                     .map(word => word.slice(0,1).toUpperCase())
                     .filter(rune => RUNES.includes(rune))
                     .map(rune => ({rune}))
  }

  private _play() {
    this.mode = "play"
    this._cdr.markForCheck()
    this._timerLapService.setTimeout(this.config.playTimeLimit)
  }

  private _result() {
    this.mode = "result"
    this._cdr.markForCheck()
    this._timerLapService.setTimeout(0)
  }

  private _timeout() {
    if (this.mode === "play") {
      this._updateResult({ isTimeout: true })
      this._result()
      return
    }

    this._play()
  }

  private _step(rune: string) {
    const next = this.runes.find(item => !item.user)
    if (next === undefined) {
      this._result()
      return
    }

    next.user = rune

    const success =  this.runes.filter(({rune, user}) => rune === user).length
    const error = this.runes.length - success
    this._updateResult({ success, error })

    if (this.runes.every(({user}) => !!user)) {
      this._result()
    }
  }

  onKey(rune: string) {
    if (this.mode !== "play") {
      return
    }

    if (!RUNES.includes(rune)) {
      return
    }

    this._step(rune)
  }

  onButtonTouch() {
    if (this.mode === "result") {
      this._updateResult({ isFinish: true })
      return
    }

    this._play()
  }
}
