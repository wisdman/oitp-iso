import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core"

import { Subscription } from "rxjs"

import { IBlackboard } from "../../interfaces"
import { BlackboardService } from "../../services"

@Component({
  selector: "card-blackboard",
  templateUrl: "./card-blackboard.component.html",
  styleUrls: [ "./card-blackboard.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBlackboardComponent implements OnInit, OnDestroy {
  constructor(
    private _blackboardService: BlackboardService,
    private _cdr: ChangeDetectorRef,
  ){}

  item?: IBlackboard

  private _blackboardSubscription!: Subscription

  ngOnInit() {
    if (this._blackboardSubscription) this._blackboardSubscription.unsubscribe()
    this._blackboardSubscription = this._blackboardService.GetExpression()
    .subscribe(item => {
      this.item = item
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    if (this._blackboardSubscription) this._blackboardSubscription.unsubscribe()
  }
}
