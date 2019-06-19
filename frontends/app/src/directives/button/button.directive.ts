import {
  Directive,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core"

import {
  fromEvent,
  merge,
  Subscription,
} from "rxjs"

import { map } from "rxjs/operators"

import { textSize } from "../../lib/util"
import { genSVGRectangle } from "../../lib/svg"

import STYLE from "./button.directive.css"

@Directive({
  selector: "button"
})
export class ButtonDirective implements OnInit, DoCheck, OnDestroy {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  private _style = getComputedStyle(this._nativeElement)
  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  private _renderTrainerButton() {
    const text = this._nativeElement.innerText

    const {
      width: textWidth,
      height: textHeight,
    } = textSize(text, `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`)

    const paddingHorizontal = this._getCSSPropertyIntValue("--trainer-button-padding-horizontal")
    const paddingVertical = this._getCSSPropertyIntValue("--trainer-button-padding-vertical")

    const svgPadding = this._getCSSPropertyIntValue("--trainer-svg-padding")

    const width = textWidth + paddingHorizontal * 2 + svgPadding * 2
    const height = textHeight + paddingVertical * 2 + svgPadding * 2

    const svgWidth = width + svgPadding * 2
    const svgHeight = height + svgPadding * 2

    const {fillPath, path } = genSVGRectangle(svgPadding, svgPadding, width, height)

    const svgNode = this._renderer.createElement("svg", "svg")
    this._renderer.setAttribute(svgNode, "width", String(svgWidth))
    this._renderer.setAttribute(svgNode, "height", String(svgHeight))
    this._renderer.setAttribute(svgNode, "viewBox", `0 0 ${svgWidth} ${svgHeight}`)
    this._renderer.addClass(svgNode, STYLE["svg"])

    const fillPathNode = this._renderer.createElement("path", "svg")
    this._renderer.setAttribute(fillPathNode, "d", fillPath)
    this._renderer.addClass(fillPathNode, STYLE["fill-path"])
    this._renderer.appendChild(svgNode, fillPathNode)

    const pathNode = this._renderer.createElement("path", "svg")
    this._renderer.setAttribute(pathNode, "d", path)
    this._renderer.addClass(pathNode, STYLE["path"])
    this._renderer.appendChild(svgNode, pathNode)

    const textNode = this._renderer.createElement("text", "svg")
    this._renderer.setAttribute(textNode, "x", String(svgPadding + width / 2))
    this._renderer.setAttribute(textNode, "y", String(svgPadding + height / 2 + 2))
    this._renderer.setAttribute(textNode, "dominant-baseline", "middle")
    this._renderer.setAttribute(textNode, "text-anchor", "middle")
    this._renderer.addClass(textNode, STYLE["text"])
    this._renderer.appendChild(textNode, this._renderer.createText(text))
    this._renderer.appendChild(svgNode, textNode)

    this._nativeElement.childNodes.forEach(node => this._renderer.removeChild(this._nativeElement, node))
    this._renderer.appendChild(this._nativeElement, svgNode)
  }

  private _focusSubscriber!: Subscription

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.button)

    if (this._nativeElement.classList.contains("button--trainer")){
      this._renderTrainerButton()
    }

    // Focus and Blur events
    this._focusSubscriber = merge(
      fromEvent(this._nativeElement, "focus").pipe(map(() => true)),
      fromEvent(this._nativeElement, "blur").pipe(map(() => false)),
    ).subscribe(isFocused =>
      isFocused ? this._renderer.addClass(this._nativeElement, STYLE.focus)
                : this._renderer.removeClass(this._nativeElement, STYLE.focus)
    )
  }

  ngOnDestroy() {
    this._focusSubscriber.unsubscribe()
  }

  ngDoCheck() {
    Array.from(this._nativeElement.classList)
         .filter(className => className in STYLE)
         .forEach(className => this._renderer.addClass(this._nativeElement, STYLE[className]))
  }
}