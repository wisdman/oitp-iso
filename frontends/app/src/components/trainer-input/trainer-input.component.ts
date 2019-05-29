import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ElementRef,
} from "@angular/core"

import { Subscription, merge } from "rxjs"

import { KeypadService, IKeypadType, IArrow } from "../../services"

@Component({
  selector: "trainer-input",
  templateUrl: "./trainer-input.component.html",
  styleUrls: [ "./trainer-input.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerInputComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _cdr: ChangeDetectorRef,
    private _keypadService: KeypadService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  @HostBinding("style.font-size.px")
  get fontSize() {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) return 16

    const { width } = this._elRef.nativeElement.getBoundingClientRect()

    for (let fontSize = 16; fontSize >= 8; fontSize--) {
      context.font = `${this._style.fontWeight} ${fontSize}px ${this._style.fontFamily}`
      const textWidth = context.measureText(this._value).width + 20
      if (textWidth < width) {
        return fontSize
      }
    }
  }

  valueList: Array<string> = [""]
  cursor: number = 0

  private _value: string = ""

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>()

  @Input()
  get value(){
    return this._value
  }

  set value(value: string) {
    this._value = value;
    this.valueChange.emit(this._value)
  }

  @Input("active")
  isActive: boolean = false

  @Input("type")
  type: IKeypadType = "RU"

  @Input("success")
  @HostBinding("class.success")
  isSuccess: boolean = false

  @Input("error")
  @HostBinding("class.error")
  isError: boolean = false

  private _keypadDataSubscriber!: Subscription
  private _keypadBackspaceSubscriber!: Subscription
  private _keypadArrowSubscriber!: Subscription

  ngOnInit() {
    if (this._keypadDataSubscriber) this._keypadDataSubscriber.unsubscribe()
    switch (this.type) {
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
  }

  ngOnDestroy(){
    if (this._keypadDataSubscriber) this._keypadDataSubscriber.unsubscribe()
    if (this._keypadBackspaceSubscriber) this._keypadBackspaceSubscriber.unsubscribe()
    if (this._keypadArrowSubscriber) this._keypadArrowSubscriber.unsubscribe()
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.value && sc.value.currentValue !== this.valueList.join("")) {
      this.valueList = [...this.value.split(""), ""]
      this.cursor = this.valueList.length - 1
      this._cdr.markForCheck()
    }
  }



  private _onInput(key: string) {
    if (!this.isActive) {
      return
    }

    this.valueList.splice(this.cursor, 0, key)
    this.cursor++

    this.value = this.valueList.join("")

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

    this.value = this.valueList.join("")

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
