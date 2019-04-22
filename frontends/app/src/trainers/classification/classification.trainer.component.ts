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
} from "@angular/core"

import { Subscription, timer } from "rxjs"
import { take } from "rxjs/operators"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerResult,
} from "./classification.trainer.interfaces"

const DEFAULT_ITEM_TIMEOUT = 5

@Component({
  selector: "trainer-classification",
  templateUrl: "./classification.trainer.component.html",
  styleUrls: [ "./classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationTrainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  config!: IClassificationTrainerConfig

  result: IClassificationTrainerResult = {
    id: "classification",
    config: this.config,
    success: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IClassificationTrainerResult>()

  private _updateResult(result: Partial<IClassificationTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  private _itemTimer!: Subscription

  ngOnInit() {
    this.groups = [...new Set(this.config.items.map(({group}) => group))]
    this.current = 0

    const itemTimeout = this.config.itemTimeout || DEFAULT_ITEM_TIMEOUT

    this._el.nativeElement.style.setProperty("--columns", String(this.groups.length))
    this._el.nativeElement.style.setProperty("--animation-duration", `${itemTimeout}s`)

    this._itemTimer = timer(itemTimeout * 1000, itemTimeout  * 1000)
                      .pipe(take(this.config.items.length))
                      .subscribe(() => this.onClick())

    this._updateResult({
      isFinish: false,
      success: 0,
    })
  }

  ngOnDestroy() {
    this._itemTimer.unsubscribe()
  }

  constructor(private _el: ElementRef){}

  @ViewChild("dataText") dataTextRef!: ElementRef<HTMLSpanElement>

  private _resetAnimation() {
    const element = this.dataTextRef.nativeElement
    element.classList.remove("animate")
    void element.offsetWidth
    element.classList.add("animate")
  }

  groups: Array<string> = []
  current: number = 0

  get currentItem() {
    return this.config.items[this.current]
  }

  onClick(group: string = "") {
    this._updateResult({
      success: this.result.success + (this.currentItem.group === group ? 1 : 0),
      isFinish: this.current >= this.config.items.length - 1,
    })
    this.current++
    this._resetAnimation()
  }
}
