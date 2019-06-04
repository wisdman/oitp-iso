import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { Subscription } from "rxjs"

import { IPointerEvent } from "../../services/pointer.service"

import { AbstractTrainerComponent } from "../abstract"

import {
  ITextTezirovanieTrainerConfig,
  ITextTezirovanieTrainerResult,
} from "./text-tezirovanie.trainer.interfaces"

@Component({
  selector: "trainer-text-tezirovanie",
  templateUrl: "./text-tezirovanie.trainer.component.html",
  styleUrls: [ "./text-tezirovanie.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTezirovanieTrainerComponent
extends AbstractTrainerComponent<ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult> {

  @ViewChild("textNode", { static: true }) textNodeRef!: ElementRef<HTMLSpanElement>

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
    div.innerHTML = v
    this._wrapNodeWords(div)
    this.appendChild(div, this.textNodeRef.nativeElement)
  }

  private _pointerDownSubscriber!: Subscription
  private _pointerMoveSubscriber!: Subscription
  private _pointerUpSubscriber!: Subscription

  init() {
    this.fullscreenService.unlock()
    this._prepareText(this.config.data)

    if (this._pointerDownSubscriber) this._pointerDownSubscriber.unsubscribe()
    this._pointerDownSubscriber = this.pointerService.pointerdown.subscribe(event => this.onPointerDown(event))

    if (this._pointerMoveSubscriber) this._pointerMoveSubscriber.unsubscribe()
    this._pointerMoveSubscriber = this.pointerService.pointermove.subscribe(event => this.onPointerMove(event))

    if (this._pointerUpSubscriber) this._pointerUpSubscriber.unsubscribe()
    this._pointerUpSubscriber = this.pointerService.pointerup.subscribe(event => this.onPointerUp(event))
  }

  destroy() {
    if (this._pointerDownSubscriber) this._pointerDownSubscriber.unsubscribe()
    if (this._pointerMoveSubscriber) this._pointerMoveSubscriber.unsubscribe()
    if (this._pointerUpSubscriber) this._pointerUpSubscriber.unsubscribe()
  }

  onPointerDown(event: IPointerEvent) {
    console.log("Down", event)
  }

  onPointerMove(event: IPointerEvent) {
    console.log("Move", event)
  }

  onPointerUp(event: IPointerEvent) {
    console.log("Up", event)
  }
}
