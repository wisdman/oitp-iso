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
    private _el: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {
    this._renderer.addClass(this._el.nativeElement, STYLE.button)
  }

  ngOnInit() {
    this._el.nativeElement
        .classList
        .forEach(className => {
          if (className in STYLE) {
            this._renderer.addClass(this._el.nativeElement, STYLE[className])
          }
        })
  }
}