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
export class WButtonDirective implements OnInit {
  constructor(
    private _elRef: ElementRef<HTMLButtonElement>,
    private _renderer: Renderer2,
  ) {}

  get _nativeElement(): HTMLButtonElement {
    return this._elRef.nativeElement
  }

  private _types: Array<string> = []

  @Input()
  set wFormButton(value: string | Array<string>) {
    for (const className of this._types) {
      this._renderer.removeClass(this._nativeElement, className)
    }
    this._types = (Array.isArray(value) ? value : value.split(/\s+/)).map(v => STYLE[v]).filter(v => !!v)
    for (const className of this._types) {
      this._renderer.addClass(this._nativeElement, className)
    }
  }

  ngOnInit() {
    this._renderer.addClass(this._nativeElement, STYLE.button)
  }

  private _isPending: boolean =  false
  @Input("pending")
  set pending(value: unknown) {
    this._isPending = value === "" || Boolean(value)
    if (this._isPending) {
      this._renderer.setAttribute(this._nativeElement, "pending", "")
    } else {
      this._renderer.removeAttribute(this._nativeElement, "pending")
    }
  }

  @HostListener("click", ["$event, $event.target"])
  onClick(event: MouseEvent) {
    if (this._isPending) {
       event.preventDefault()
       event.cancelBubble = true
       event.stopImmediatePropagation()
    }
  }
}