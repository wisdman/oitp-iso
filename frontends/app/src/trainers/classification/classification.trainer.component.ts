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

import { TimerLapService } from "../../services"

import {
  ClassificationTrainerID,
  IClassificationTrainerConfig,
  IClassificationTrainerItem,
  IClassificationTrainerGroup,
  IClassificationTrainerResult,
} from "./classification.trainer.interfaces"

@Component({
  selector: "trainer-classification",
  templateUrl: "./classification.trainer.component.html",
  styleUrls: [ "./classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationTrainerComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private _el: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IClassificationTrainerConfig

  result: IClassificationTrainerResult = {
    id: ClassificationTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IClassificationTrainerResult>()

  private _updateResult(result: Partial<IClassificationTrainerResult>) {
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
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.itemTimeLimit * this.config.items.length)
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

  groups: Array<IClassificationTrainerGroup> = []
  item!: IClassificationTrainerItem

  private _init() {
    this.groups = [...new Set(this.config.items.map(({group}) => group))].map(data =>({data}))

    const itemMsTimeLimit = this.config.itemTimeLimit * 1000

    this._stepSubject = new Subject<true>()
    this._itemsSubscription = zip(
      from(this.config.items),
      this._stepSubject.pipe(switchMap(() => timer(0, itemMsTimeLimit))),
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

    this._el.nativeElement.style.setProperty("--animation-duration", `${itemMsTimeLimit}ms`)

    if (this.config.type === 'colors') {
      this._el.nativeElement.style.setProperty("--columns", `${this.groups.length}`)
    } else if (this.groups.length % 5 === 0) {
      this._el.nativeElement.style.setProperty("--columns", `5`)
    } else if (this.groups.length % 4 === 0) {
      this._el.nativeElement.style.setProperty("--columns", `4`)
    } else if (this.groups.length % 3 === 0) {
      this._el.nativeElement.style.setProperty("--columns", `3`)
    } else if (this.groups.length % 2 === 0) {
      this._el.nativeElement.style.setProperty("--columns", `2`)
    }

    this._stepSubject.next(true)
  }

  @ViewChild("dataNode") dataNodeRef!: ElementRef<HTMLSpanElement>
  private _resetAnimation() {
    const element = this.dataNodeRef.nativeElement
    window.requestAnimationFrame(() => {
      element.classList.remove("animate")
      window.requestAnimationFrame(() => {
        element.classList.add("animate")
      })
    })
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  onTouch(group: IClassificationTrainerGroup) {
    let { success, error } = this.result
    if (this.item.group === group.data) {
      success++

      group.isSuccess = true
      setTimeout(() => {
        group.isSuccess = false
        this._cdr.markForCheck()
      }, 250)
    } else {
      error++

      group.isError = true
      setTimeout(() => {
        group.isError = false
        this._cdr.markForCheck()
      }, 250)
    }
    this._updateResult({ success, error })
    this._stepSubject.next(true)
  }
}
