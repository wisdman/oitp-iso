import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  Input,
} from "@angular/core"

import { NgControl } from "@angular/forms"

import { Subscription, Observable, of } from "rxjs"
import { distinctUntilChanged, map, skipWhile, startWith } from "rxjs/operators"

import STYLE from "./input.directive.css"

@Directive({
  selector: "input[wFormInput], select[wFormInput]"
})
export class InputDirective implements OnInit, OnDestroy {
  static RandomID = (function *() {
    let counter = Number.MIN_SAFE_INTEGER
    while (true) {
      yield Math.random().toString(36).substring(2) + String(++counter)
    }
  })()

  private _id = InputDirective.RandomID.next().value

  private readonly _wrapperNode: HTMLDivElement = this._renderer.createElement("div")
  private readonly _labelNode: HTMLLabelElement = this._renderer.createElement("label")
  private readonly _errorOverlay: HTMLDivElement = this._renderer.createElement("div")
  private readonly _errorWrapper: HTMLDivElement = this._renderer.createElement("div")
  private readonly _errorMessage: HTMLParagraphElement = this._renderer.createElement("p")

  constructor(
    private _elRef: ElementRef<HTMLInputElement | HTMLSelectElement>,
    private _ngControl: NgControl,
    private _renderer: Renderer2,
  ){
    this._renderer.addClass(this._wrapperNode, STYLE.wrapper)
    this._renderer.addClass(this._labelNode, STYLE.label)
    this._renderer.addClass(this._errorMessage, STYLE.errorMessage)
    this._renderer.addClass(this._errorWrapper, STYLE.errorWrapper)
    this._renderer.addClass(this._errorOverlay, STYLE.errorOverlay)

    this._renderer.setAttribute(this._labelNode, "for", this._id)
    this._renderer.appendChild(this._wrapperNode, this._labelNode)

    this._renderer.appendChild(this._errorWrapper, this._errorMessage)
    this._renderer.appendChild(this._errorOverlay, this._errorWrapper)
    this._renderer.appendChild(this._wrapperNode, this._errorOverlay)
  }

  private get _nativeElement(): HTMLInputElement | HTMLSelectElement {
    return this._elRef.nativeElement
  }

  private get _errorMessageText(): Observable<string> {
    return (this._ngControl.statusChanges || of("DISABLED")).pipe(
      startWith("VALID"),
      map(status => {
        if (status !== "INVALID") {
          return ""
        }
        const error = this._ngControl.errors && Object.values(this._ngControl.errors)[0]
        return error && error.message || ""
      }),
      distinctUntilChanged(),
    )
  }

  private get _isInvalid(): Observable<boolean> {
    return (this._ngControl.statusChanges || of("DISABLED")).pipe(
      skipWhile(() => !!(this._ngControl.untouched && this._ngControl.pristine || this._ngControl.disabled)),
      startWith("VALID"),
      map(status => status === "INVALID"),
      distinctUntilChanged(),
    )
  }

  private get _isPending(): Observable<boolean> {
    return (this._ngControl.statusChanges || of("DISABLED")).pipe(
      skipWhile(() => !!this._ngControl.disabled),
      startWith("VALID"),
      map(status => status === "PENDING"),
      distinctUntilChanged(),
    )
  }

  private _errorMessageSubscription!: Subscription
  private _invalidSubscription!: Subscription
  private _pendingSubscription!: Subscription

  ngOnInit() {
    this._renderer.setAttribute(this._nativeElement, "id", this._id)
    this._renderer.addClass(this._nativeElement, STYLE.input)
    this._renderer.setAttribute(this._nativeElement, "placeholder", String.fromCharCode(160))

    this._renderer.insertBefore(this._nativeElement.parentNode, this._wrapperNode, this._nativeElement)
    this._renderer.insertBefore(this._wrapperNode, this._nativeElement, this._labelNode)

    if (this._errorMessageSubscription) this._errorMessageSubscription.unsubscribe()
    this._errorMessageSubscription = this._errorMessageText.subscribe(message => {
      this._errorMessage.childNodes.forEach(textNode => this._renderer.removeChild(this._errorMessage, textNode))
      this._renderer.appendChild(this._errorMessage, this._renderer.createText(message))
    })

    if (this._invalidSubscription) this._invalidSubscription.unsubscribe()
    this._invalidSubscription = this._isInvalid.subscribe(isInvalid =>
      isInvalid ? this._renderer.addClass(this._nativeElement, STYLE.invalid)
                : this._renderer.removeClass(this._nativeElement, STYLE.invalid)
    )

    if (this._pendingSubscription) this._pendingSubscription.unsubscribe()
    this._pendingSubscription = this._isPending.subscribe(isPending =>
      isPending ? this._renderer.addClass(this._wrapperNode, STYLE.pending)
                : this._renderer.removeClass(this._wrapperNode, STYLE.pending)
    )
  }

  ngOnDestroy() {
    if (this._errorMessageSubscription) this._errorMessageSubscription.unsubscribe()
    if (this._invalidSubscription) this._invalidSubscription.unsubscribe()
    if (this._pendingSubscription) this._pendingSubscription.unsubscribe()
    this._renderer.removeChild(this._wrapperNode.parentNode, this._wrapperNode)
  }

  @Input("aria-label")
  set label(value: string | undefined) {
    this._labelNode.childNodes.forEach(textNode => this._renderer.removeChild(this._labelNode, textNode))
    this._renderer.appendChild(this._labelNode, this._renderer.createText(value || ""))
  }
}
