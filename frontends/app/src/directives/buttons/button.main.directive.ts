import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
} from "@angular/core"

import STYLE from "./styles/index.css"

@Directive({
  selector: "button.button--main"
})
export class ButtonMainDirective implements OnInit {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.button)
    this._renderer.addClass(this._nativeElement, STYLE.main)
  }
}