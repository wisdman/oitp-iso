import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { Subscription } from "rxjs"

@Component({
  selector: "main-dashboard",
  templateUrl: "./dashboard.layout.html",
  styleUrls: [ "./dashboard.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout implements OnInit, OnDestroy {
  constructor(private _route: ActivatedRoute){}

  hasProgress: boolean = true

  private _dataSubscription!: Subscription

  ngOnInit(){
    if (this._dataSubscription) this._dataSubscription.unsubscribe()
    this._dataSubscription = this._route.data.subscribe(data => this.hasProgress = !!data.hasProgress)
  }
  ngOnDestroy(){
    if (this._dataSubscription) this._dataSubscription.unsubscribe()
  }
}
