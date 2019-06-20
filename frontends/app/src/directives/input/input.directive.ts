import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core"

import {
  NgControl,
} from "@angular/forms"

import {
  fromEvent,
  merge,
  of,
  Subscription,
} from "rxjs"

import {
  filter,
  map,
} from "rxjs/operators"

import STYLE from "./input.directive.css"

const RandomID = (function *() {
  let counter = Number.MIN_SAFE_INTEGER
  while (true) {
    yield Math.random().toString(36).substring(2) + String(++counter)
  }
})()

@Directive({
  selector: "input, select"
})
export class InputDirective implements OnInit, OnDestroy, DoCheck {

  constructor(
    private _elRef: ElementRef<HTMLInputElement | HTMLSelectElement>,
    private _ngControl: NgControl,
    private _renderer: Renderer2,
  ){}

  private _id = RandomID.next().value

  private readonly _wrapperNode: HTMLDivElement = this._renderer.createElement("div")
  private _labelNode?: HTMLLabelElement
  private _messageNode?: HTMLParagraphElement

  get _inputNode(): HTMLInputElement | HTMLSelectElement {
    return this._elRef.nativeElement
  }

  private _typeClass: string = ""

  @Input("type")
  set type(value: string) {
    if (this._typeClass && STYLE[this._typeClass]) {
      this._renderer.removeClass(this._wrapperNode, STYLE[this._typeClass])
    }

    this._typeClass = value
    if (this._typeClass && STYLE[this._typeClass]) {
      this._renderer.addClass(this._wrapperNode, STYLE[this._typeClass])
    }
  }

  @Input("label")
  set label(value: string | undefined) {
    if (this._labelNode) {
      this._renderer.removeChild(this._wrapperNode, this._labelNode)
      this._labelNode = undefined
    }

    if (value) {
      this._labelNode = this._renderer.createElement("label")
      this._renderer.addClass(this._labelNode, STYLE.label)
      this._renderer.appendChild(this._labelNode, this._renderer.createText(value))
      this._renderer.setAttribute(this._labelNode, "for", this._id)
      this._renderer.appendChild(this._wrapperNode, this._labelNode)
    }
  }

  @Output("enter")
  enterChange: EventEmitter<undefined> = new EventEmitter<undefined>()

  private _messageClass: string = ""

  @Input("message")
  set message(value: [string, string | undefined] | string | undefined) {
    if (this._messageClass) {
      this._renderer.removeClass(this._wrapperNode, this._messageClass)
      this._messageClass = ""
    }

    if (this._messageNode) {
      this._renderer.removeChild(this._wrapperNode, this._messageNode)
      this._messageNode = undefined
    }

    if (value) {
      const [className, messageText] = Array.isArray(value) ? value : [value, undefined]
      this._messageClass = STYLE[className]
      if (this._messageClass) {
        this._renderer.addClass(this._wrapperNode, this._messageClass)
      }

      if (messageText) {
        this._messageNode = this._renderer.createElement("p")
        this._renderer.addClass(this._messageNode, STYLE.message)
        this._renderer.appendChild(this._messageNode, this._renderer.createText(messageText))
        this._renderer.appendChild(this._wrapperNode, this._messageNode)
      }
    }
  }

  private _focusSubscriber!: Subscription
  private _valueSubscriber!: Subscription
  private _keypadEnterSubscriber!: Subscription

  ngOnInit() {
    this._renderer.addClass(this._wrapperNode, STYLE.wrapper)
    this._renderer.insertBefore(this._inputNode.parentNode, this._wrapperNode, this._inputNode)

    this._renderer.setAttribute(this._inputNode, "id", this._id)
    this._renderer.addClass(this._inputNode, STYLE.input)
    this._renderer.appendChild(this._wrapperNode, this._inputNode)

    // Focus and Blur events
    this._focusSubscriber = merge(
      fromEvent(this._inputNode, "focus").pipe(map(() => true)),
      fromEvent(this._inputNode, "blur").pipe(map(() => false)),
    ).subscribe(isFocused =>
      isFocused ? this._renderer.addClass(this._wrapperNode, STYLE.focus)
                : this._renderer.removeClass(this._wrapperNode, STYLE.focus)
    )

    // Enter events
    this._keypadEnterSubscriber =
      fromEvent<KeyboardEvent>(this._inputNode, "keydown", { passive: false, capture: true }).pipe(
        filter(({key}) => key.match(/^ENTER$/i) !== null),
      ).subscribe(() => this.enterChange.emit())

    // Value change event
    const control = this._ngControl.control
    if (control !== null) {
      this._valueSubscriber = merge(
        of(control.value),
        control.valueChanges,
      ).subscribe(value =>
        value ? this._renderer.addClass(this._wrapperNode, STYLE["not-empty"])
              : this._renderer.removeClass(this._wrapperNode, STYLE["not-empty"])
      )
    }
  }

  ngOnDestroy() {
    this._focusSubscriber.unsubscribe()
    this._keypadEnterSubscriber.unsubscribe()
    if (this._valueSubscriber) this._valueSubscriber.unsubscribe()
  }

  ngDoCheck() {
    Array.from(this._inputNode.classList)
         .filter(value => !value.match(/^ng-/i))
         .filter(value => value !== STYLE.input)
         .forEach(value => {
           this._renderer.removeClass(this._inputNode, value)
           this._renderer.addClass(this._wrapperNode, value)
           if (STYLE[value] && STYLE[value] !== STYLE.input) {
             this._renderer.addClass(this._wrapperNode, STYLE[value])
           }
         })
  }
}


