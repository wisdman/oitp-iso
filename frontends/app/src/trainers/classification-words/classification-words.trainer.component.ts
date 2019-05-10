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
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core"

import { Subscription, from, timer, Subject, zip } from "rxjs"
import { switchMap } from "rxjs/operators"

import { RoughGenerator } from "../../lib/rough/generator"

import { LapTimerService } from "../../services"

import {
  ClassificationWordsTrainerID,
  IClassificationWordsTrainerConfig,
  IClassificationWordsTrainerItem,
  IClassificationWordsTrainerMatrixItem,
  IClassificationWordsTrainerResult,
} from "./classification-words.trainer.interfaces"

@Component({
  selector: "trainer-classification-words",
  templateUrl: "./classification-words.trainer.component.html",
  styleUrls: [ "./classification-words.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationWordsTrainerComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private _el: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _lapTimerService: LapTimerService,
  ){}

  private _style = getComputedStyle(this._el.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input()
  config!: IClassificationWordsTrainerConfig

  result: IClassificationWordsTrainerResult = {
    id: ClassificationWordsTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IClassificationWordsTrainerResult>()

  private _updateResult(result: Partial<IClassificationWordsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._lapTimerService.lapTimeout.subscribe(() => this._timeout())
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    if (this._itemsSubscription) this._itemsSubscription.unsubscribe()
  }

  private _stepSubject!: Subject<true>
  private _itemsSubscription!: Subscription

  private _groups: Array<string> = []
  item!: IClassificationWordsTrainerItem

  matrix?: Array<IClassificationWordsTrainerMatrixItem>
  matrixViewBox: string = "0 0 0 0"
  matrixWidth: number = 0
  matrixHeight: number = 0

  private _init() {
    this._groups = [...new Set(this.config.items.map(({group}) => group))]
    this._initMatrix()

    const wordTimeLimit = this.config.wordTimeLimit

    this._stepSubject = new Subject<true>()

    this._itemsSubscription = zip(
      from(this.config.items),
      this._stepSubject.pipe(switchMap(() => timer(0, wordTimeLimit * 1000))),
      value => value,
    ).subscribe(
      item => {
        this.item = item
        this._cdr.markForCheck()
        this._resetAnimation()
      },
      error => console.error(error),
      () => this._updateResult({ isFinish: true })
    )

    this._el.nativeElement.style.setProperty("--animation-duration", `${wordTimeLimit}s`)
    this._stepSubject.next(true)
  }

  private _initMatrix() {
    const columns = this._groups.length
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }

    context.font = "bold 18px sans-serif"
    const getTextWidth = (text: string) => context.measureText(text).width
    const maxTextWidth = Math.ceil(Math.max(...this._groups.map((data) => getTextWidth(data))))

    const boxMinWidth = this._getCSSPropertyIntValue("--item-min-width")
    const boxPadding = this._getCSSPropertyIntValue("--item-padding")
    const boxStroke = this._getCSSPropertyIntValue("--item-stroke")
    const boxHeight = this._getCSSPropertyIntValue("--item-height")

    const boxWidth = Math.max(maxTextWidth + boxPadding * 2, boxMinWidth) + boxStroke * 2

    const width = boxWidth * columns + boxStroke * 2
    const height = boxHeight + boxStroke * 2

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )

    this.matrix = this._groups.map((data, i) => {
      const x = boxWidth * (i % columns) + boxStroke
      const y = boxStroke

      const sets = svgGenerator.rectangle(x, y, boxWidth, boxHeight, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

       return {
        data,
        x: x + boxWidth - boxWidth / 2,
        y: y + boxHeight - boxHeight / 2,
        path,
        fillPath,
      }
    })
  }

  @ViewChild("dataNode") dataNodeRef!: ElementRef<HTMLSpanElement>
  private _resetAnimation() {
    const element = this.dataNodeRef.nativeElement
    element.classList.remove("animate")
    void element.offsetWidth
    element.classList.add("animate")
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  private _check(item: IClassificationWordsTrainerMatrixItem) {
    let { success, error } = this.result
    if (this.item.group === item.data) {
      success++

      item.isSuccess = true
      setTimeout(() => {
        item.isSuccess = false
        this._cdr.markForCheck()
      }, 250)
    } else {
      error++

      item.isError = true
      setTimeout(() => {
        item.isError = false
        this._cdr.markForCheck()
      }, 250)
    }
    this._updateResult({ success, error })
    this._stepSubject.next(true)
  }

  onTouch(item: IClassificationWordsTrainerMatrixItem) {
    this._check(item)
  }
}
