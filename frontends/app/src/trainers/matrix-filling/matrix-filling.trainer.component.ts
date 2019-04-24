import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  HostListener,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerResult,
  IMatrixFillingTrainerItem,
} from "./matrix-filling.trainer.interfaces"

interface IItem {
  item?: IMatrixFillingTrainerItem
  userItem?: IMatrixFillingTrainerItem

  isSuccess?: boolean
  isError?: boolean
}

@Component({
  selector: "trainer-matrix-filling",
  templateUrl: "./matrix-filling.trainer.component.html",
  styleUrls: [ "./matrix-filling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFillingTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IMatrixFillingTrainerConfig

  result: IMatrixFillingTrainerResult = {
    id: "matrix-filling",
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMatrixFillingTrainerResult>()

  private _updateResult(result: Partial<IMatrixFillingTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  constructor(private _sanitizer: DomSanitizer){}

  get matrixStyle() {
    const side = Math.sqrt(this.config.matrix.length)
    return this._sanitizer.bypassSecurityTrustStyle(`--side: ${side}`)
  }

  items!: Array<IMatrixFillingTrainerItem>
  matrix!: Array<IItem>

  private _init() {
    this.items = this.config.items.map(shape => ({shape}))
    this.matrix = this.config
                      .matrix
                      .map((id) => id < 0 ? {} : { item: this.items[id] })
  }

  sanitizeUrl(item: IMatrixFillingTrainerItem) {
    return this._sanitizer.bypassSecurityTrustUrl(item.shape)
  }

  private _check() {
    const success = this.matrix
                        .reduce( (success, item) => item.item === item.userItem ? ++success : success, 0)
    const error = this.matrix.length - success
    const isDone = this.matrix.every(item => item.userItem !== undefined)
    this._updateResult({ success, error, isFinish: error === 0 || isDone })
  }

  dragItemsStart(event: DragEvent, id?: number) {
    if (this.config.mode !== "play") {
      return
    }

    if (id === undefined) {
      return
    }

    (event.dataTransfer as DataTransfer).setData("id", String(id))
  }

  dragMatrixStart(event: DragEvent, userItem?: IMatrixFillingTrainerItem) {
    if (this.config.mode !== "play") {
      return
    }

    if (userItem === undefined) {
      return
    }

    const id = this.items.indexOf(userItem)

    if (id < 0) {
      return
    }

    (event.dataTransfer as DataTransfer).setData("id", String(id))
  }

  allowDrop(event: DragEvent) {
    if (this.config.mode !== "play") {
      return
    }
    event.preventDefault()
  }

  drop(event: DragEvent, item:IItem) {
    if (this.config.mode !== "play") {
      return
    }
    event.preventDefault()

    const id = Number.parseInt((event.dataTransfer as DataTransfer).getData("id"))
    if (Number.isNaN(id) || id < 0) {
      return
    }

    item.userItem = this.items[id]
    this._check()
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    if (this.config.mode !== "show") {
      return
    }
    this._updateResult({ isFinish: true })
  }

}



// import {
//   Component,
//   ChangeDetectionStrategy,
//   EventEmitter,
//   Input,
//   OnChanges,
//   OnInit,
//   Output,
//   SimpleChanges,
//   HostListener,
// } from "@angular/core"

// import { RoughGenerator } from "../../lib/rough/generator"

// import {
//   IMatrixFillingTrainerConfig,
//   IMatrixFillingTrainerResult,
//   IMatrixFillingTrainerItem,
// } from "./matrix-filling.trainer.interfaces"

// const BOX_SIZE = 100
// const PADDING = 8
// const GAP = 8
// const SHAPE_SIZE = 80

// interface IMatrixItem {
//   item?: IMatrixFillingTrainerItem
//   userItem?: IMatrixFillingTrainerItem

//   x: number,
//   y: number,

//   fillPath: string,
//   path: string,

//   isSuccess?: boolean
//   isError?: boolean
// }

// interface IPaletteItem extends IMatrixFillingTrainerItem {
//   x: number,
//   y: number,
//   fillPath: string,
//   path: string,
// }

// @Component({
//   selector: "trainer-matrix-filling",
//   templateUrl: "./matrix-filling.trainer.component.html",
//   styleUrls: [ "./matrix-filling.trainer.component.css" ],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class MatrixFillingTrainerComponent implements OnInit, OnChanges {
//   @Input()
//   config!: IMatrixFillingTrainerConfig

//   result: IMatrixFillingTrainerResult = {
//     id: "matrix-filling",
//     config: this.config,
//     success: 0,
//     error: 0,
//   }

//   @Output("result")
//   resultValueChange = new EventEmitter<IMatrixFillingTrainerResult>()

//   private _updateResult(result: Partial<IMatrixFillingTrainerResult>) {
//     this.result = {...this.result, config: this.config, ...result}
//     this.resultValueChange.emit(this.result)
//   }

//   ngOnChanges(sc: SimpleChanges ) {
//     if (sc.config !== undefined && !sc.config.firstChange) {
//       this.ngOnInit()
//     }
//   }

//   paletteWidth!: number
//   paletteHeight!: number

//   matrixWidth!: number
//   matrixHeight!: number

//   shapeWidth: number = SHAPE_SIZE
//   shapeHeight: number = SHAPE_SIZE

//   get matrixViewBox() {
//     return `0 0 ${this.matrixWidth} ${this.matrixHeight}`
//   }

//   get paletteViewBox() {
//     return `0 0 ${this.paletteWidth} ${this.paletteHeight}`
//   }

//   getCursor(uri: string) {
//     return `url(${uri}), auto`;
//   }

//   matrix!: Array<IMatrixItem>
//   palette!: Array<IPaletteItem>

//   ngOnInit() {
//     this.matrix = this.config.matrix.map(id => ({ item: this.config.items[id], x: 0, y: 0, fillPath: "", path: "" }))
//     this._initMatrixLayout()

//     this.palette = this.config.items.map(item => ({...item,  x: 0, y: 0, fillPath: "", path: "" }) )
//     this._initPaletteLayout()
//   }

//   private _initMatrixLayout() {
//     const side = Math.sqrt(this.matrix.length)
//     const svgWidth = BOX_SIZE * side + GAP * (side - 1) + PADDING * 2
//     const svgHeight = svgWidth

//     const svgGenerator = new RoughGenerator({}, { width: svgWidth, height: svgHeight } )

//     this.matrix = this.matrix.map((item, i) => {
//       const x = (BOX_SIZE + GAP) * (i % side) + PADDING
//       const y = (BOX_SIZE + GAP) * Math.floor(i / side) + PADDING

//       const sets = svgGenerator
//                     .rectangle(x, y, BOX_SIZE, BOX_SIZE, {
//                         fill: "none",
//                         fillStyle: "solid",
//                         roughness: 1
//                     }).sets

//       const pathSet = sets.find(set => set.type === "path")
//       item.path = pathSet && svgGenerator.opsToPath(pathSet) || ""

//       const fillPathSet = sets.find(set => set.type === "fillPath")
//       item.fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

//       item.x = x + (BOX_SIZE - SHAPE_SIZE) / 2
//       item.y = y + (BOX_SIZE - SHAPE_SIZE) / 2

//       return item
//     })

//     this.matrixWidth = svgWidth
//     this.matrixHeight = svgHeight
//   }

//   private _initPaletteLayout() {
//     const length = this.palette.length
//     const paletteWidth = BOX_SIZE * length + GAP * (length - 1) + PADDING * 2
//     const paletteHeight = BOX_SIZE + PADDING * 2

//     const svgGenerator = new RoughGenerator({}, { width: paletteWidth, height: paletteHeight } )

//     this.palette = this.palette.map((item, i) => {
//       const x = (BOX_SIZE + GAP) * i + PADDING
//       const y = PADDING

//       const sets = svgGenerator
//                     .rectangle(x, y, BOX_SIZE, BOX_SIZE, {
//                         fill: "none",
//                         fillStyle: "solid",
//                         roughness: 1
//                     }).sets

//       const pathSet = sets.find(set => set.type === "path")
//       item.path = pathSet && svgGenerator.opsToPath(pathSet) || ""

//       const fillPathSet = sets.find(set => set.type === "fillPath")
//       item.fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

//       item.x = x + (BOX_SIZE - SHAPE_SIZE) / 2
//       item.y = y + (BOX_SIZE - SHAPE_SIZE) / 2

//       return item
//     })

//     this.paletteWidth = paletteWidth
//     this.paletteHeight = paletteHeight
//   }

//   private _check() {
//     const success = this.matrix
//                         .reduce( (success, item) => item.item === item.userItem ? ++success : success, 0)
//     const error = this.matrix.length - success
//     const isDone = this.matrix.every(item => item.userItem !== undefined)
//     this._updateResult({ success, error, isFinish: error === 0 || isDone })
//   }

//   dragItemsStart(node: SVGGElement, id?: any) {
//     if (this.config.mode !== "play") {
//       return
//     }

//     if (id === undefined) {
//       return
//     }

//     const image = node.querySelector("image")
//     if (!image) {
//       return
//     }

//     // const mImage = image.cloneNode(true)


//     // (event.dataTransfer as DataTransfer).setData("id", String(id))
//   }

//   dragMatrixStart(event: DragEvent, userItem?: IMatrixFillingTrainerItem) {
//     if (this.config.mode !== "play") {
//       return
//     }

//     if (userItem === undefined) {
//       return
//     }

//     const id = this.config.items.indexOf(userItem)

//     if (id < 0) {
//       return
//     }

//     (event.dataTransfer as DataTransfer).setData("id", String(id))
//   }

//   allowDrop(event: DragEvent) {
//     if (this.config.mode !== "play") {
//       return
//     }
//     event.preventDefault()
//   }

//   drop(event: DragEvent, item:IMatrixItem) {
//     if (this.config.mode !== "play") {
//       return
//     }
//     event.preventDefault()

//     const id = Number.parseInt((event.dataTransfer as DataTransfer).getData("id"))
//     if (Number.isNaN(id) || id < 0) {
//       return
//     }

//     item.userItem = this.config.items[id]
//     this._check()
//   }

//   @HostListener("click", ["$event"])
//   onHostClick() {
//     if (this.config.mode !== "show") {
//       return
//     }
//     this._updateResult({ isFinish: true })
//   }

// }