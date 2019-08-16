import { Directive, ElementRef, OnInit, Renderer2, Input } from "@angular/core"

import STYLE from "./hamburger-icon.directive.css"

@Directive({
  selector: "[hamburgerIcon]"
})
export class HamburgerDirective implements OnInit {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  @Input()
  set hamburgerIcon(value: boolean) {
    if (value) this._renderer.addClass(this._nativeElement, STYLE.arrow)
    else this._renderer.removeClass(this._nativeElement, STYLE.arrow)
  }

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.hamburger)
  }
}