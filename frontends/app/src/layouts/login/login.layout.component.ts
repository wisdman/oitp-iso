import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { Subscription } from "rxjs"

@Component({
  selector: "login-layout",
  templateUrl: "./login.layout.component.html",
  styleUrls: [ "./login.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit, OnDestroy {
  constructor(private _route: ActivatedRoute) {}

  isSingIn: boolean = true

  private _routeSubscriber!: Subscription

  ngOnInit() {
    this._routeSubscriber = this._route.data.subscribe(({isSingIn}) => this.isSingIn = isSingIn)
  }

  ngOnDestroy() {
    this._routeSubscriber.unsubscribe()
  }

  onSocialAction(type: any) {
    console.log(type)
  }


}
