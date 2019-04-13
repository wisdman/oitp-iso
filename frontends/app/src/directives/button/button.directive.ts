import { Directive, ElementRef, Renderer2 } from "@angular/core"
import STYLE from "./button.directive.css"

@Directive({
  selector: "button"
})
export class ButtonDirective {
  constructor(
    private _el: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {
    this._renderer.addClass(this._el.nativeElement, STYLE.button)
  }
}