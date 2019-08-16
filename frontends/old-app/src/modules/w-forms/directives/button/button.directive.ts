import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  Input,
} from "@angular/core"

import STYLE from "./button.directive.css"

@Directive({
  selector: "button[wFormButton]"
})
export class ButtonDirective implements OnInit {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.button)
  }

  private _idPending: boolean =  false
  @Input("pending")
  set pending(value: unknown) {
    this._idPending = value === "" || Boolean(value)
    if (this._idPending) {
      this._renderer.setAttribute(this._nativeElement, "pending", "")
    } else {
      this._renderer.removeAttribute(this._nativeElement, "pending")
    }
  }

  @HostListener("click", ["$event, $event.target"])
  onClick(event: MouseEvent) {
    if (this._idPending) {
       event.preventDefault()
       event.cancelBubble = true
       event.stopImmediatePropagation()
    }
  }
}