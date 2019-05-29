import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"

import { Subscription, merge } from "rxjs"

import { KeypadService, IKeypadType, IArrow } from "../../services"

@Component({
  selector: "trainer-input",
  templateUrl: "./trainer-input.component.html",
  styleUrls: [ "./trainer-input.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerInputComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _keypadService: KeypadService,
  ){}

  @Output("value")
  valueValueChange: EventEmitter<string> = new EventEmitter<string>()

  valueList: Array<string> = []
  cursor: number = 1

  @Input("value")
  set value(value: string) {
    this.valueList = [...value.split(""), ""]
    this.cursor = this.valueList.length - 1
    this._cdr.markForCheck()
  }

  get value(): string {
    return this.valueList.join()
  }

  @Input("active")
  isActive: boolean = false

  @Input("trainerInput")
  trainerInput: IKeypadType = "RU"

  private _keypadDataSubscriber!: Subscription
  private _keypadBackspaceSubscriber!: Subscription
  private _keypadArrowSubscriber!: Subscription

  ngOnInit() {
    if (this._keypadDataSubscriber) this._keypadDataSubscriber.unsubscribe()
    switch (this.trainerInput) {
      case "RU":
        this._keypadDataSubscriber = merge(this._keypadService.ru, this._keypadService.symbols, this._keypadService.space)
                                      .subscribe(key => this._onInput(key))
        break

      case "EN":
        this._keypadDataSubscriber = merge(this._keypadService.en, this._keypadService.symbols, this._keypadService.space)
                                      .subscribe(key => this._onInput(key))
        break

      case "NUMBERS":
        this._keypadDataSubscriber = merge(this._keypadService.numbers, this._keypadService.dot)
                                      .subscribe(key => this._onInput(key))
        break
    }

    if (this._keypadBackspaceSubscriber) this._keypadBackspaceSubscriber.unsubscribe()
    this._keypadBackspaceSubscriber = this._keypadService.backspace
                                          .subscribe(() => this._onBackspace())

    if (this._keypadArrowSubscriber) this._keypadArrowSubscriber.unsubscribe()
    this._keypadArrowSubscriber = this._keypadService.arrow
                                      .subscribe((arrow) => this._onArrow(arrow))

    this.value = ""
  }

  ngOnDestroy(){
    if (this._keypadDataSubscriber) this._keypadDataSubscriber.unsubscribe()
    if (this._keypadBackspaceSubscriber) this._keypadBackspaceSubscriber.unsubscribe()
    if (this._keypadArrowSubscriber) this._keypadArrowSubscriber.unsubscribe()
  }

  private _onInput(key: string) {
    if (!this.isActive) {
      return
    }

    this.valueList.splice(this.cursor, 0, key)
    this.cursor++
    this._cdr.markForCheck()
  }

  private _onBackspace() {
    if (!this.isActive) {
      return
    }

    if (this.cursor <= 0) return
    this.cursor--
    if (this.cursor < 0) this.cursor = 0
    this.valueList.splice(this.cursor, 1)
    this._cdr.markForCheck()
  }

  private _onArrow(arrow: IArrow) {
    if (!this.isActive) {
      return
    }

    switch (arrow) {
      case "LEFT":
        if (this.cursor > 0) {
          this.cursor--
          this._cdr.markForCheck()
        }
        return
      case "RIGHT":
        if (this.cursor < this.valueList.length - 1) {
          this.cursor++
          this._cdr.markForCheck()
        }
        return
    }
  }

  onTouch(i: number) {
    this.cursor = i
  }
}
