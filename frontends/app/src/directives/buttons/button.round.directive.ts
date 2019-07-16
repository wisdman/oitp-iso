import {
  Directive,
  DoCheck,
  ElementRef,
  OnInit,
  Renderer2,
} from "@angular/core"

import STYLE from "./styles/index.css"
const CUSTOM_STYLES = ["button--transparent"]

@Directive({
  selector: "button.button--round"
})
export class ButtonRoundDirective implements OnInit, DoCheck {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.button)
    this._renderer.addClass(this._nativeElement, STYLE.round)
  }

  ngDoCheck() {
    Array.from(this._nativeElement.classList)
         .filter(className => CUSTOM_STYLES.includes(className))
         .forEach(className => this._renderer.addClass(this._nativeElement, STYLE[className]))
  }
}