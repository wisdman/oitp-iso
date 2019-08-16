import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, HostBinding } from "@angular/core"

import { fromEvent, Subscription } from "rxjs"
import { map, distinctUntilChanged } from "rxjs/operators"

import { SideBarService } from "../../services"

@Component({
  selector: "header",
  templateUrl: "./header.components.html",
  styleUrls: [ "./header.components.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = ""

  constructor(
    private _cdr: ChangeDetectorRef,
    private _sideBarService: SideBarService
  ){}

  @HostBinding("class.shadow")
  shadow: boolean = false

  private _scrollSubscription?: Subscription

  ngOnInit() {
    if (this._scrollSubscription) this._scrollSubscription.unsubscribe()
    this._scrollSubscription = fromEvent(window, "scroll")
    .pipe(map(() => window.scrollY > 24), distinctUntilChanged())
    .subscribe(value => {
      this.shadow = value
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    if (this._scrollSubscription) this._scrollSubscription.unsubscribe()
  }

  openSidebar() {
    this._sideBarService.open()
  }
}
