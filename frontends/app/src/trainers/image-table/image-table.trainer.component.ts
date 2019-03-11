import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
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
  IImage,
} from "../interfaces"

import {
  IImageTableTrainerConfig,
  IImageTableTrainerResult,
} from "./image-table.trainer.interfaces"

interface IImageTableItem {
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

  constructor(
    private _sanitizer: DomSanitizer,
    private _el: ElementRef<HTMLElement>
  ){}

  matrix!: Array<IImageTableItem>

  @Input()
  config!: IImageTableTrainerConfig

  result: IImageTableTrainerResult = {
    id: "image-table",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IImageTableTrainerResult>()

  private _updateResult(result: Partial<IImageTableTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  dataUrl(image: IImage) {
    return this._sanitizer.bypassSecurityTrustUrl(image.data)
  }

  ngOnInit() {
    const columns = this.config.columns
    const rows = this.config.rows
    const items = this.config.items.length

    const max = Math.max(columns + 1, rows + 1, items)

    this._el.nativeElement.style.setProperty("--columns", `${columns}`)
    this._el.nativeElement.style.setProperty("--rows", `${rows}`)
    this._el.nativeElement.style.setProperty("--items", `${items}`)
    this._el.nativeElement.style.setProperty("--max", `${max}`)

    this.matrix = this
                  .config
                  .matrix
                  .map((id) => id < 0 ? {} : { image: this.config.items[id] })

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

  private check() {
    const success = this.matrix
                        .reduce( (success, item) => item.image === item.userImage ? ++success : success, 0)
    const error = this.matrix.length - success
     this._updateResult({ success, error, isFinish: error === 0 })
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

    const id = this.config.items.indexOf(userImage)

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

  drop(event: DragEvent, item:IImageTableItem) {
    if (!this.config.isGameMode) {
      return
    }
    event.preventDefault()

    const id = Number.parseInt((event.dataTransfer as DataTransfer).getData("id"))
    if (Number.isNaN(id) || id < 0) {
      return
    }

    item.userImage = this.config.items[id]
    this.check()
  }
}
