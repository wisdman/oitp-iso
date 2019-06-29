import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { Subscription } from "rxjs"

import { IPointerEvent } from "../../lib/pointer-events"

import { AbstractTrainerComponent } from "../abstract"

import {
  IImageCarpetTrainerConfig,
  IImageCarpetTrainerResult,
} from "./image-carpet.trainer.interfaces"

import {
  ICarperItem,
} from "../../services"

@Component({
  selector: "trainer-image-carpet",
  templateUrl: "./image-carpet.trainer.component.html",
  styleUrls: [ "./image-carpet.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarpetTrainerComponent
extends AbstractTrainerComponent<IImageCarpetTrainerConfig, IImageCarpetTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  items!: Array<ICarperItem & { el?: SVGPathElement}>

  private _carpetSubscription!: Subscription

  private _pointerupSubscriber!: Subscription
  private _pointermoveSubscriber!: Subscription

  @ViewChild("matrixNode", { static: true }) matrixRef!: ElementRef<SVGSVGElement>
  private _svgPoint!: DOMPoint

  init() {
    this.mode = "show"
    this._svgPoint = this.matrixRef.nativeElement.createSVGPoint()

    this._carpetSubscription = this.carpetService.carpet.subscribe(carpet => {
      this.matrixWidth = carpet.width
      this.matrixHeight = carpet.height
      this.items = carpet.items
      this.markForCheck()

      this.mode = "show"
      this.setTimeout(this.config.showTimeLimit)
    })

    this.carpetService.getCarpet(this.config.item)

    this._pointerupSubscriber = this.pointerService.pointerup.subscribe(event => this.onPointerUp(event))
    this._pointermoveSubscriber = this.pointerService.pointermove.subscribe(event => this.onpointermMove(event))
  }

  destroy() {
    this._carpetSubscription.unsubscribe()
    this._pointerupSubscriber.unsubscribe()
    this._pointermoveSubscriber.unsubscribe()
  }

  startPlay() {
    this.setTimeout(0)

    this.items.forEach(item => {
      if (!item.el) {
        return
      }
      // const box = item.el.getBBox()
      console.dir(item.el)
    })

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
    this.markForCheck()
  }

  showResult() {
    this.finish()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return

     case "play":
        this.showResult()
        return
    }
  }

  private _cursorPoint([mx,my]: [number, number]): [number, number] {
    this._svgPoint.x = mx
    this._svgPoint.y = my

    const ctm = this.matrixRef.nativeElement.getScreenCTM()
    if (!ctm) {
      return [mx,my]
    }

    const {x, y} = this._svgPoint.matrixTransform(ctm.inverse())
    return [x, y]
  }

  private _currentItem?: ICarperItem
  private _lastXY: [number, number] = [0,0]

  onTouch({x, y}: IPointerEvent, item: ICarperItem) {
    if (this.mode !== "play") {
      return
    }

    this._currentItem = item
    this._lastXY = this._cursorPoint([x, y])
  }

  onPointerUp({x, y}: IPointerEvent) {
    if (this.mode !== "play") {
      return
    }

    if (this._currentItem === undefined) {
      return
    }

    ;[x, y] = this._cursorPoint([x, y])
    const [lx, ly] = this._lastXY
    this._lastXY = [x, y]
    const dx = x - lx
    const dy = y - ly

    this._currentItem.dx += dx
    this._currentItem.dy += dy
    this._currentItem.transform = `translate(${this._currentItem.dx}px, ${this._currentItem.dy}px)`
    this._currentItem = undefined
    this.markForCheck()
  }

  onpointermMove({x, y}: IPointerEvent) {
    if (this.mode !== "play") {
      return
    }

    if (this._currentItem === undefined) {
      return
    }

    ;[x, y] = this._cursorPoint([x, y])
    const [lx, ly] = this._lastXY
    this._lastXY = [x, y]
    const dx = x - lx
    const dy = y - ly

    this._currentItem.dx += dx
    this._currentItem.dy += dy
    this._currentItem.transform = `translate(${this._currentItem.dx}px, ${this._currentItem.dy}px)`
    this.markForCheck()
  }

  onCreatePath(node: SVGPathElement, item: ICarperItem & { el?: SVGPathElement}) {
    console.log(item)
    item.el = node
  }
}
