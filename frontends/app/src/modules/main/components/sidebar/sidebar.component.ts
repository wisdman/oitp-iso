import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, HostBinding, ChangeDetectorRef, HostListener, ElementRef } from "@angular/core"

import { Subscription } from "rxjs"

import { SideBarService } from "../../services"
import { ConfigService } from "../../../../services"

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: [ "./sidebar.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef: ElementRef<HTMLElement>,
    private _sideBarService: SideBarService,
    private _configService: ConfigService,
  ){}

  isDebugMode = this._configService.DebugMode

  @HostBinding("class.open")
  isOpen: boolean = false

  private _isOpenSubscription!: Subscription

  ngOnInit() {
    if (this._isOpenSubscription) this._isOpenSubscription.unsubscribe()
    this._isOpenSubscription = this._sideBarService.isOpen
    .subscribe(value => {
      this.isOpen = value
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    if (this._isOpenSubscription) this._isOpenSubscription.unsubscribe()
  }

  closeSidebar() {
    this._sideBarService.close()
  }

  @HostListener("click", ["$event"])
  onClick({clientX, target}: {clientX: number, target: Node}) {
    if (!this.isOpen || this._elRef.nativeElement !== target || clientX <= this._elRef.nativeElement.offsetWidth) {
      return
    }
    this._sideBarService.close()
  }
}
