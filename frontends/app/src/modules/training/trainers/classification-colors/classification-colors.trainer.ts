import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from "@angular/core"

import { from, merge, Subject, Subscription, zip } from "rxjs"
import { switchMap, scan, filter, tap } from "rxjs/operators"

import { ISelectorItem } from "../../components/trainer-selector"
import { AbstractTrainer } from "../abstract"

import { IClassificationColorsConfig } from "./classification-colors.interfaces"

@Component({
  selector: "trainer-classification-colors",
  templateUrl: "./classification-colors.trainer.html",
  styleUrls: [ "./classification-colors.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationColorsTrainer extends AbstractTrainer<IClassificationColorsConfig> {

  @ViewChild("textNode", { static: true }) dataNodeRef!: ElementRef<HTMLSpanElement>
  private _resetTextAnimation() {
    const element = this.dataNodeRef.nativeElement
    window.requestAnimationFrame(() => {
      element.classList.remove("item-text--animate")
      element.style.setProperty("--top", "0")
      window.requestAnimationFrame(() => {
        element.classList.add("item-text--animate")
      })
    })
  }
  private _setTextAnimation(value: number) {
    const element = this.dataNodeRef.nativeElement
    const topValue = Math.round(value / (this.itemTimeLimit - 1) * 100000) / 1000
    window.requestAnimationFrame(() => {
      element.style.setProperty("--top", String(topValue))
    })
  }

  transitionDuration!: number
  itemTimeLimit!: number

  isError!: boolean
  isSuccess!: boolean

  success!: number

  groups!: Array<ISelectorItem>
  item!: Partial<{
    color: string
    title: string
  }>

  private _stepSubject: Subject<undefined> = new Subject<undefined>()
  private _itemTimeoutSubject: Subject<number> = new Subject<number>()
  private _itemSubscription!: Subscription

  init() {
    this.transitionDuration = this.getCSSPropertyIntValue("--transition-duration")
    this.isError = this.isSuccess = false
    this.success = 0

    this.groups = this.config
                      .items
                      .map( ({color: data}) => ({data}) )
                      .sort(() => Math.random() - 0.5)

    this.itemTimeLimit = Math.floor(this.config.playTimeLimit / this.config.items.length / 1000)

    this._itemSubscription = zip(
      from([...this.config.items.sort(() => Math.random() - 0.5), undefined]),
      merge(
        this._stepSubject,
        this._itemTimeoutSubject.pipe(
          switchMap(() => this.timerService.globalTimer.pipe(scan(current => ++current, 0))),
          tap(value => this._setTextAnimation(value)),
          filter(value => value === this.itemTimeLimit),
        )
      ),
      value => ({...value}),
    ).subscribe(
      item => {
        this.item = item
        this.groups.forEach(item => item.isActive = item.isError = item.isSuccess = false)
        this.markForCheck()
        this._resetTextAnimation()
        this._itemTimeoutSubject.next()
      },
      undefined,
      () => setTimeout(() => this.finish(), this.transitionDuration),
    )
  }

  destroy() {
    this._itemSubscription.unsubscribe()
  }

  start() {
    super.start()
    this._stepSubject.next()
  }

  timeout() {
    this.finish()
  }

  finish() {
    super.finish(this.success / this.config.items.length * 100)
  }

  onTouch(group: ISelectorItem) {
    if (group.data === this.item.color) {
      this.success++
      this.isSuccess = true
    } else {
      this.isError = true
    }

    setTimeout(() => {
      this.isSuccess = this.isError = false
      this.markForCheck()
    }, this.transitionDuration)

    this._stepSubject.next()
  }
}
