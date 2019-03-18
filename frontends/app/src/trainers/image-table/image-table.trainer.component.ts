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

import { DomSanitizer } from "@angular/platform-browser"

import {
  IImageTableTrainerConfig,
  IImageTableTrainerResult,
} from "./image-table.trainer.interfaces"

interface IImage {
  id: number,
  data: string
}

interface IItem {
  image?: IImage
  userImage?: IImage
}

@Component({
  selector: "trainer-image-table",
  templateUrl: "./image-table.trainer.component.html",
  styleUrls: [ "./image-table.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageTableTrainerComponent implements OnInit, OnChanges {

  constructor(private _sanitizer: DomSanitizer){}

  @Input()
  config!: IImageTableTrainerConfig

  result: IImageTableTrainerResult = {
    id: "image-table",
    config: this.config,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageTableTrainerResult>()

  private _updateResult(result: Partial<IImageTableTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  items: Array<IImage> = []
  matrix: Array<IItem> = []

  dataUrl(image: IImage) {
    return this._sanitizer.bypassSecurityTrustUrl(image.data)
  }

  get matrixStyle() {
    const side = Math.sqrt(this.matrix.length)
    return this._sanitizer.bypassSecurityTrustStyle(`--side: ${side}`)
  }

  ngOnInit() {
    this.items = this.config.items
                            .map((data, id) => ({ id, data }))

    this.matrix = this.config.matrix
                             .map((id) => id < 0 ? {} : { image: this.items[id] })



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

  @HostListener("click", ["$event"])
  onHostClick() {
    if (this.config.isGameMode) {
      return
    }
    this._updateResult({ isFinish: true })
  }

  private _check() {
    const success = this.matrix
                        .reduce( (success, item) => item.image === item.userImage ? ++success : success, 0)
    const error = this.matrix.length - success
    const isDone = this.matrix.every(item => item.userImage !== undefined)
    this._updateResult({ success, error, isFinish: error === 0 || isDone })
  }

  dragItemsStart(event: DragEvent, id?: number) {
    if (!this.config.isGameMode) {
      return
    }

    if (id === undefined) {
      return
    }

    (event.dataTransfer as DataTransfer).setData("id", String(id))
  }

  dragMatrixStart(event: DragEvent, userImage?: IImage) {
    if (!this.config.isGameMode) {
      return
    }

    if (userImage === undefined) {
      return
    }

    const id = this.items.indexOf(userImage)

    if (id < 0) {
      return
    }

    (event.dataTransfer as DataTransfer).setData("id", String(id))
  }

  allowDrop(event: DragEvent) {
    if (!this.config.isGameMode) {
      return
    }
    event.preventDefault()
  }

  drop(event: DragEvent, item:IItem) {
    if (!this.config.isGameMode) {
      return
    }
    event.preventDefault()

    const id = Number.parseInt((event.dataTransfer as DataTransfer).getData("id"))
    if (Number.isNaN(id) || id < 0) {
      return
    }

    item.userImage = this.items[id]
    this._check()
  }
}
