import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { Subscription } from "rxjs"

import { IPointerEvent } from "../../lib/pointer-events"
import { genSVGRectangle } from "../../lib/svg"

import { AbstractTrainerComponent } from "../abstract"

import { IImageCarpetsTrainerConfig } from "./image-carpets.trainer.interfaces"

interface ICarperItem {
  path: string
  fill: string
  group: number

  dx: number
  dy: number
  transform: string

  el?: SVGPathElement
}

@Component({
  selector: "trainer-image-carpets",
  templateUrl: "./image-carpets.trainer.component.html",
  styleUrls: [ "./image-carpets.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarpetsTrainerComponent
extends AbstractTrainerComponent<IImageCarpetsTrainerConfig> {

  @ViewChild("matrixNode", { static: true }) matrixRef!: ElementRef<SVGSVGElement>
  private _svgPoint!: DOMPoint

  items!: Array<ICarperItem>
  border!: string

  errors!: number

  private _pointerupSubscriber!: Subscription
  private _pointermoveSubscriber!: Subscription

  init() {
    this.errors = 0

    this.matrixWidth = this.config.width
    this.matrixHeight = this.config.height

    this._svgPoint = this.matrixRef.nativeElement.createSVGPoint()

    const svgPadding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    this.border = genSVGRectangle(
                    svgPadding * 2,
                    svgPadding * 2,
                    this.matrixWidth - svgPadding * 4,
                    this.matrixHeight - svgPadding * 4,
                  ).path

    this.items = this.config.items.map(item => {
      const fill = this.config.colors[item.color] || "#ffffff"
      const group = item.group * 100 + item.color
      return ({path: item.d, fill, group, dx: 0, dy: 0, transform: ""})
    })

    if (this._pointerupSubscriber) this._pointerupSubscriber.unsubscribe()
    this._pointerupSubscriber = this.pointerService.pointerup.subscribe(event => this.onPointerUp(event))

    if (this._pointermoveSubscriber)  this._pointermoveSubscriber.unsubscribe()
    this._pointermoveSubscriber = this.pointerService.pointermove.subscribe(event => this.onpointermMove(event))

    this.preview()
  }

  destroy() {
    this._pointerupSubscriber.unsubscribe()
    this._pointermoveSubscriber.unsubscribe()
  }

  timeout() {
    if (this.mode === "preview") {
      this.start()
      return
    }

    super.timeout()
    this.result()
  }

  start() {
    this.setTimeout(0)

    const cx = this.matrixWidth / 2
    const cy = this.matrixHeight / 2
    const cmx = Math.min(this.matrixWidth, this.matrixHeight) / 2

    const angle = 360 / this.items.length
    const startAngle = Math.floor(Math.random() * -100)

    this.items.forEach((item,i) => {
      if (!item.el) {
        return
      }

      const {x, y, width, height} = item.el.getBBox()

      const radius = cmx - Math.max(width, height) / 2
      const delta = (startAngle + angle * i)*Math.PI/180

      const dx = Math.round(cx + radius*Math.cos(delta)) - (x + width / 2)
      const dy = Math.round(cy + radius*Math.sin(delta)) - (y + height / 2)

      item.dx = dx
      item.dy = dy
      item.transform = `translate(${item.dx}px, ${item.dy}px)`
    })
    this.markForCheck()

    const moveDuration = this.getCSSPropertyIntValue("--move-duration")
    setTimeout(() => {
      super.start()
      window.requestAnimationFrame(() => {
        this.setCSSProperty("--move-duration", "0s")
      })
    }, moveDuration)
  }

  result() {
    super.result()
    this._currentItem = undefined

    const deltaX = this.matrixWidth * 0.1
    const deltaY = this.matrixHeight * 0.1

    this.errors = this.items
                      .reduce((groups, item) => {
                        const sumItem = groups[item.group] || { x:0, y:0, i:0 }
                        sumItem.x += item.dx
                        sumItem.y += item.dy
                        sumItem.i++
                        groups[item.group] = sumItem
                        return groups
                      }, new Array<{x: number, y: number, i: number}>())
                      .reduce((sum, {x, y, i}) =>
                        sum + Math.max(
                                Math.min(Math.floor(Math.abs(x / i) / deltaX), i),
                                Math.min(Math.floor(Math.abs(y / i) / deltaY), i),
                              ),
                         0
                      )
  }

  finish() {
    super.finish((this.items.length - this.errors) / this.items.length * 100)
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

  onCreatePath(node: SVGPathElement, item: ICarperItem) {
    item.el = node
  }
}
