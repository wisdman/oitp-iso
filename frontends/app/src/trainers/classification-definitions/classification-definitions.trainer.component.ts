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

import { IClassificationDefinitionsTrainerConfig } from "./classification-definitions.trainer.interfaces"

interface IItem {
  definition: string
  data: string
  isSuccess?: boolean
}

@Component({
  selector: "trainer-classification-definitions",
  templateUrl: "./classification-definitions.trainer.component.html",
  styleUrls: [ "./classification-definitions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationDefinitionsTrainerComponent
  extends AbstractTrainerComponent<IClassificationDefinitionsTrainerConfig> {

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
