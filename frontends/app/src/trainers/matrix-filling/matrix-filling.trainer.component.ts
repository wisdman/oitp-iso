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

  matrix!: Array<IItem>

  private _init() {
    this.matrix = this.config
                      .matrix
                      .map((id) => id < 0 ? {} : { item: this.config.items[id] })
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

    const id = this.config.items.indexOf(userItem)

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

    item.userItem = this.config.items[id]
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