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

import { genSVGRectangle } from "../../lib/svg"

import STYLE from "./styles/index.css"
const FILTRED_STYLES = Object.values(STYLE)

const RandomID = (function *() {
  let counter = Number.MIN_SAFE_INTEGER
  while (true) {
    yield Math.random().toString(36).substring(2) + String(++counter)
  }
})()

@Directive({
  selector: "input.input--trainer"
})
export class InputTrainerDirective implements OnInit, OnDestroy, DoCheck {

  constructor(
    private _elRef: ElementRef<HTMLInputElement | HTMLSelectElement>,
    private _ngControl: NgControl,
    private _renderer: Renderer2,
  ){}

  private _id = RandomID.next().value

  private readonly _wrapperNode: HTMLDivElement = this._renderer.createElement("div")

  get _nativeElement(): HTMLInputElement | HTMLSelectElement {
    return this._elRef.nativeElement
  }

  private _resultClass: string = ""

  @Input("result")
  set type(value: string) {
    if (this._resultClass && STYLE[this._resultClass]) {
      this._renderer.removeClass(this._wrapperNode, STYLE[this._resultClass])
    }

    this._resultClass = value

    if (this._resultClass && STYLE[this._resultClass]) {
      this._renderer.addClass(this._wrapperNode, STYLE[this._resultClass])
    }
  }

  @Output("enter")
  enterChange: EventEmitter<undefined> = new EventEmitter<undefined>()

  private _genBG() {
    const { path } = genSVGRectangle(0, 0, 200, 48)

    const svgNode = this._renderer.createElement("svg", "svg")
    this._renderer.setAttribute(svgNode, "width", "200")
    this._renderer.setAttribute(svgNode, "height", "48")
    this._renderer.setAttribute(svgNode, "viewBox", "0 0 200 48")
    this._renderer.setAttribute(svgNode, "preserveAspectRatio", "none")
    this._renderer.addClass(svgNode, STYLE["svg"])

    const pathNode = this._renderer.createElement("path", "svg")
    this._renderer.setAttribute(pathNode, "d", path)
    this._renderer.setAttribute(pathNode, "vector-effect", "non-scaling-stroke")
    this._renderer.addClass(pathNode, STYLE["path"])
    this._renderer.appendChild(svgNode, pathNode)

    return svgNode
  }

  private _focusSubscriber!: Subscription
  private _valueSubscriber!: Subscription
  private _keypadEnterSubscriber!: Subscription

  ngOnInit() {
    this._renderer.addClass(this._wrapperNode, STYLE.wrapper)
    this._renderer.addClass(this._wrapperNode, STYLE.trainer)
    this._renderer.insertBefore(this._nativeElement.parentNode, this._wrapperNode, this._nativeElement)

    this._renderer.appendChild(this._wrapperNode, this._genBG())

    this._renderer.setAttribute(this._nativeElement, "id", this._id)
    this._renderer.addClass(this._nativeElement, STYLE.input)
    this._renderer.appendChild(this._wrapperNode, this._nativeElement)

    // Focus and Blur events
    if (this._focusSubscriber) this._focusSubscriber.unsubscribe()
    this._focusSubscriber = merge(
      fromEvent(this._nativeElement, "focus").pipe(map(() => true)),
      fromEvent(this._nativeElement, "blur").pipe(map(() => false)),
    ).subscribe(isFocused =>
      isFocused ? this._renderer.addClass(this._wrapperNode, STYLE.focus)
                : this._renderer.removeClass(this._wrapperNode, STYLE.focus)
    )

    // Enter events
    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    this._keypadEnterSubscriber =
      fromEvent<KeyboardEvent>(this._nativeElement, "keydown", { passive: false, capture: true }).pipe(
        filter(({key}) => key.match(/^ENTER$/i) !== null),
      ).subscribe(() => this.enterChange.emit())

    // Value change event
    if (this._valueSubscriber) this._valueSubscriber.unsubscribe()
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

    this._wrapperNode.remove()
  }

  ngDoCheck() {
    Array.from(this._nativeElement.classList)
         .filter(value => !value.match(/^ng-/i) && !FILTRED_STYLES.includes(value))
         .forEach(value => {
           this._renderer.removeClass(this._nativeElement, value)
           this._renderer.addClass(this._wrapperNode, value)
         })
  }
}


