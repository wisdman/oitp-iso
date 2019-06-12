import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
} from "@angular/core"

import STYLE from "./input.directive.css"

@Directive({
  selector: "input"
})
export class InputDirective implements OnInit {

  constructor(
    private _elRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2,
  ) {
    this._renderer.addClass(this._elRef.nativeElement, STYLE.input)
  }

  ngOnInit() {
    this._elRef.nativeElement
        .classList
        .forEach(className => {
          if (className in STYLE) {
            this._renderer.addClass(this._elRef.nativeElement, STYLE[className])
          }
        })

    const div = this._renderer.createElement("div");
    const el = this._elRef.nativeElement
    const parent = el.parentNode

    this._renderer.insertBefore(parent, div, el)
    this._renderer.appendChild(div, el)
  }
}


