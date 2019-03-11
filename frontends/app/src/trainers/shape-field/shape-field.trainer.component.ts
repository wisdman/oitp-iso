import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import {
  IShape,
} from "../interfaces"

import {
  IShapeFieldTrainerConfig,
  IShapeFieldTrainerResult,
} from "./shape-field.trainer.interfaces"

interface IShapeFieldItem {
  shape: IShape
  x: number
  y: number
}

@Component({
  selector: "trainer-shape-field",
  templateUrl: "./shape-field.trainer.component.html",
  styleUrls: [ "./shape-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShapeFieldTrainerComponent implements OnInit, OnChanges {

  private readonly shapeSize = 50
  private readonly matrixSide = 5
  private readonly width = 450
  private readonly height = 350
  private readonly gapx = (this.width - (this.shapeSize * this.matrixSide)) / (this.matrixSide - 1)
  private readonly gapy = (this.height - (this.shapeSize * this.matrixSide)) / (this.matrixSide - 1)

  get viewBox() {
    return `-2 -2 ${this.width + 4} ${this.height + 4}`
  }

  showMatrix!: Array<IShapeFieldItem | undefined>
  gameMatrix!: Array<IShapeFieldItem>

  get matrix() {
    return this.config.isGameMode ? this.gameMatrix : this.showMatrix
  }

  @Input()
  config!: IShapeFieldTrainerConfig

  result: IShapeFieldTrainerResult = {
    id: "shape-field",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IShapeFieldTrainerResult>()

  private _updateResult(result: Partial<IShapeFieldTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnInit() {
    this.showMatrix = this
                      .config
                      .matrix
                      .map((id, i) => {
                        if (id < 0) {
                          return undefined
                        }

                        const shape = this.config.items[id]
                        const x = i % this.matrixSide * (this.shapeSize + this.gapx) + this.shapeSize / 2
                        const y = Math.floor(i / this.matrixSide) * (this.shapeSize + this.gapy) + this.shapeSize / 2
                        return {shape, x, y}
                      })

    if (this.config.isGameMode) {
      this.gameMatrix = this
                        .config
                        .matrix
                        .map((id, _) => {
                          if (id < 0) {
                            return undefined
                          }

                          const shape = this.config.items[id]
                          const x = 0
                          const y = 0
                          return {shape, x, y}
                        })
                        .filter((v:IShapeFieldItem | undefined): v is IShapeFieldItem => v !== undefined)
    }

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  points(item: IShapeFieldItem) {
    return item.shape
                .data
                .map(([x, y]) => [x + item.x, y + item.y])

  }

  onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (this.config.isGameMode) {
      return
    }

    this._updateResult({ isFinish: true })
  }

  private check() {
    const success = this.showMatrix
                        .reduce( (success, showItem) => {
                          if (showItem === undefined) {
                            return success
                          }

                          return this.gameMatrix
                                     .some(gameItem =>
                                            (showItem.x - gameItem.x)**2 + (showItem.y - gameItem.y)**2 < 1000
                                            && showItem.shape === gameItem.shape
                                          )
                                 ? ++success : success
                        }, 0)

    const error = this.gameMatrix.length - success
    this._updateResult({success, error, isFinish: error === 0 })
  }

  private mouseData?: {
    item: IShapeFieldItem,
    x: number
    y: number
  }

  onDown(event: MouseEvent, item: IShapeFieldItem) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.config.isGameMode) {
      return
    }
    this.mouseData = { item, x: event.pageX, y: event.pageY }
  }

  onMove(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (!this.config.isGameMode) {
      return
    }

    if (this.mouseData === undefined) {
      return
    }

    const deltaX = event.pageX - this.mouseData.x
    const deltaY = event.pageY - this.mouseData.y

    this.mouseData.item.x += deltaX
    this.mouseData.item.y += deltaY

    this.mouseData.x = event.pageX
    this.mouseData.y = event.pageY
  }

  @HostListener("window:mouseup", ["$event"])
  onUp(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (!this.config.isGameMode) {
      return
    }

    this.mouseData = undefined
    this.check()
  }
}
