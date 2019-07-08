import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  Subject,
  Subscription,
} from "rxjs"

import {
  takeWhile,
  map,
} from "rxjs/operators"

import { ISelectorItem } from "../../components/trainer-selector"

import { AbstractTrainerComponent } from "../abstract"

import {
  IClassificationDefinitionsTrainerConfig,
  IClassificationDefinitionsTrainerItem,
  IClassificationDefinitionsTrainerResult,
} from "./classification-definitions.trainer.interfaces"

interface IItem extends IClassificationDefinitionsTrainerItem {
  isSuccess?: boolean
}

@Component({
  selector: "trainer-classification-definitions",
  templateUrl: "./classification-definitions.trainer.component.html",
  styleUrls: [ "./classification-definitions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationDefinitionsTrainerComponent
extends AbstractTrainerComponent<IClassificationDefinitionsTrainerConfig, IClassificationDefinitionsTrainerResult> {

  transitionDuration!: number
  isError!: boolean
  isSuccess!: boolean

  success!: number

  groups!: Array<ISelectorItem>
  items!: Array<IItem>
  item!: IItem

  private _stepSubject: Subject<undefined> = new Subject<undefined>()
  private _itemSubscription!: Subscription

  init() {
    this.transitionDuration = this.getCSSPropertyIntValue("--transition-duration")
    this.isError = this.isSuccess = false
    this.success = 0

    this.groups = [...new Set(this.config.items.map( ({data}) => ({data}) ))]
                  .sort(() => Math.random() - 0.5)

    this.items = this.config.items.sort(() => Math.random() - 0.5)

    if (this._itemSubscription) this._itemSubscription.unsubscribe()
    this._itemSubscription = this._stepSubject.pipe(
      map(() => this.items.find(item => !item.isSuccess)),
      takeWhile(item => item !== undefined),
    ).subscribe(
      item => {
        this.item = item as IItem
        this.groups.forEach(item => item.isActive = item.isError = item.isSuccess = false)
        this.markForCheck()
      },
      error => console.error(error),
      () => this.finish(),
    )

    this._stepSubject.next()
    this.setTimeout(this.config.playTimeLimit)
    this.timeMeter()
  }

  destroy() {
    if (this._itemSubscription) this._itemSubscription.unsubscribe()
  }

  timeout() {
    super.timeout()
    this.finish()
  }

  finish() {
    this.timeMeter()
    const result = Math.round(this.success / this.config.items.length * 100)
    this.updateResult({ result: result < 0 ? 0 : result > 100 ? 100 : result })
    super.finish()
  }

  onTouch(group: ISelectorItem) {
    if (group.data === this.item.data) {
      this.success++
      this.item.isSuccess = true
      this.isSuccess = true
    } else {
      this.success--
      this.isError = true
    }

    setTimeout(() => {
      this.isSuccess = this.isError = false
      this.markForCheck()
      this._stepSubject.next()
    }, this.transitionDuration)
  }
}
