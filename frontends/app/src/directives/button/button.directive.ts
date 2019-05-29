import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core"

import STYLE from "./button.directive.css"

@Directive({
  selector: "button"
})
export class ButtonDirective implements OnInit {
  @Input()
  color: string = ""

  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {
    this._renderer.addClass(this._elRef.nativeElement, STYLE.button)
  }

  ngOnInit() {
    this._elRef.nativeElement
        .classList
        .forEach(className => {
          if (className in STYLE) {
            this._renderer.addClass(this._elRef.nativeElement, STYLE[className])
          }
        })
  }
}