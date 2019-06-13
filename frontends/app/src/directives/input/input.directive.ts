import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  DoCheck,
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

import { map } from "rxjs/operators"

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

  private _textNode: Text = this._renderer.createText("")
  private readonly _labelNode: HTMLLabelElement = this._renderer.createElement("label")
  private readonly _wrapperNode: HTMLDivElement = this._renderer.createElement("div")

  get _inputNode(): HTMLInputElement | HTMLSelectElement {
    return this._elRef.nativeElement
  }

  constructor(
    private _elRef: ElementRef<HTMLInputElement | HTMLSelectElement>,
    private _ngControl: NgControl,
    private _renderer: Renderer2,
  ) {
    this._renderer.appendChild(this._labelNode, this._textNode)

    const id = RandomID.next().value
    this._renderer.setAttribute(this._labelNode, "for", id)
    this._renderer.setAttribute(this._inputNode, "id", id)
  }

  @Input("placeholder")
  set label(value: string) {
    this._renderer.removeChild(this._labelNode, this._textNode)
    this._textNode = this._renderer.createText(value)
    this._renderer.appendChild(this._labelNode, this._textNode)
  }

  private _type: string = ""

  @Input("type")
  set type(value: string) {
    if (this._type && STYLE[this._type]) {
      this._renderer.removeClass(this._wrapperNode, STYLE[this._type])
    }

    this._type = value
    if (this._type && STYLE[this._type]) {
      this._renderer.addClass(this._wrapperNode, STYLE[this._type])
    }
  }

  private _focusSubscriber!: Subscription
  private _valueSubscriber!: Subscription

  ngOnInit() {
    this._renderer.insertBefore(this._inputNode.parentNode, this._wrapperNode, this._inputNode)
    this._renderer.appendChild(this._wrapperNode, this._inputNode)
    this._renderer.appendChild(this._wrapperNode, this._labelNode)

    // Add base classses
    this._renderer.addClass(this._inputNode, STYLE.input)
    this._renderer.addClass(this._labelNode, STYLE.label)
    this._renderer.addClass(this._wrapperNode, STYLE.wrapper)

    // Focus and Blur events
    this._focusSubscriber = merge(
      fromEvent(this._inputNode, "focus").pipe(map(() => true)),
      fromEvent(this._inputNode, "blur").pipe(map(() => false)),
    ).subscribe(isFocused =>
      isFocused ? this._renderer.addClass(this._wrapperNode, STYLE.focus)
                : this._renderer.removeClass(this._wrapperNode, STYLE.focus)
    )

    // Value change event
    const control = this._ngControl.control
    if (control !== null) {
      this._valueSubscriber = merge(
        of(control.value),
        control.valueChanges,
      ).subscribe(value => this._onValueChange(value))
    }
  }

  ngOnDestroy() {
    if (this._valueSubscriber) this._valueSubscriber.unsubscribe()
    this._focusSubscriber.unsubscribe()
  }

  private _onValueChange(value: unknown) {
    if (!value) {
      this._renderer.removeClass(this._wrapperNode, STYLE["not-empty"])
    } else {
      this._renderer.addClass(this._wrapperNode, STYLE["not-empty"])
    }
  }

  ngDoCheck() {
    Array.from(this._inputNode.classList)
         .filter(value => STYLE[value])
         .forEach(value => {
           this._renderer.removeClass(this._inputNode, value)
           this._renderer.addClass(this._wrapperNode, value)
         })
  }
}


