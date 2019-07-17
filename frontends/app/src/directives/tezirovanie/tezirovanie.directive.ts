import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from "@angular/core"

import { Subscription } from "rxjs"

import {
  filter,
  map,
} from "rxjs/operators"

import { initPointerUp } from "../../lib/pointer-events"

import STYLE from "./tezirovanie.directive.css"

@Directive({
  selector: "[tezirovanie]"
})
export class TezirovanieDirective implements OnInit, OnDestroy, OnChanges {
  constructor(
    private _elRef: ElementRef<HTMLElement | SVGElement>,
    private _renderer: Renderer2,
  ) {}

  @Input("tezirovanie")
  tezirovanie: string = ""

  @Input("mode")
  mode: "init" | "preview" | "play" | "result" = "init"

  @HostBinding(`class`)
  get isResult() {
    return this.mode === "result" ? STYLE.result : null
  }

  private _wrapText(v: string): Array<Node> {
    return v.split(/\s+/).map( (word, i) => {
      const span = document.createElement("span")
      const text = new Text((i > 0 ? " " : "") + word)
      span.appendChild(text)
      return span
    })
  }

  private _wrapNodeWords(node: Node) {
    for (let child of Array.from(node.childNodes)) {
      if (child instanceof Text) {
        if (child.textContent === null) {
          return
        }
        this._wrapText(child.textContent).forEach(span => {
          node.insertBefore(span, child)
        })
        node.removeChild(child)
      } else {
        this._wrapNodeWords(child)
      }
    }
  }

  private _prepareText(v: string) {
    const div = document.createElement("div")
    div.innerHTML = v.replace(/<mark>/ig, `<mark class="${STYLE.mark}">`)
    this._wrapNodeWords(div)
    this._elRef.nativeElement.innerHTML = ""
    this._renderer.appendChild(this._elRef.nativeElement, div)
  }

  private _pointerUpSubscriber!: Subscription

  ngOnInit() {
    this._prepareText(this.tezirovanie)

    if (this._pointerUpSubscriber) this._pointerUpSubscriber.unsubscribe()
    this._pointerUpSubscriber = initPointerUp(this._elRef.nativeElement).pipe(
                                  filter(() => this.mode === 'play'),
                                  filter(({originalEvent}) => originalEvent.cancelable),
                                  map(({originalEvent}) => originalEvent.target),
                                  filter((t: EventTarget | null): t is HTMLSpanElement => t instanceof HTMLSpanElement),
                                ).subscribe(span => span.classList.toggle(STYLE["user-mark"]))
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.tezirovanie !== undefined && !sc.tezirovanie.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    this._pointerUpSubscriber.unsubscribe()
  }
}
