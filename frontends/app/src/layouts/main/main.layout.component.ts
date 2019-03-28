import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from "@angular/core"

import { Router, NavigationEnd, ActivatedRoute } from "@angular/router"

import { fromEvent, Subscription } from "rxjs"
import { filter, map, mergeMap, distinctUntilChanged } from "rxjs/operators"

@Component({
  selector: "main-layout",
  templateUrl: "./main.layout.component.html",
  styleUrls: [ "./main.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  public isSidebarActive: boolean = false
  public title: string = ""

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _ngZone: NgZone,
    private _cdr: ChangeDetectorRef,
  ) {
    this._router
    .events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._route),
      map( route => route.firstChild ? route.firstChild : route),
      filter( route => route.outlet === "primary" ),
      mergeMap( route => route.data ),
    )
    .subscribe(({ title = "" }:{ title?: string } = {}) => {
      this.title = title
      this.isSidebarActive = false
      window.scrollTo(0, 0)
    })
  }

  @ViewChild("sidebarNode") sidebarRef?: ElementRef<HTMLDivElement>

  onSidebarClick({clientX, target}: {clientX: number, target: Node}) {
    if (!this.isSidebarActive) {
      return
    }

    if (!this.sidebarRef || !this.sidebarRef.nativeElement) {
      return
    }

    if (this.sidebarRef.nativeElement !== target) {
      return
    }

    if (clientX <= this.sidebarRef.nativeElement.offsetWidth) {
      return
    }

    this.isSidebarActive = false
  }

  headerShadow: boolean = false
  private _scrollSubscription?: Subscription

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this._scrollSubscription = fromEvent(window, "scroll")
      .pipe(map(() => window.scrollY > 24), distinctUntilChanged())
      .subscribe(value => {
        this._ngZone.run(() => {
          this.headerShadow = value
          this._cdr.detectChanges()
        })
      })
    })
  }

  ngOnDestroy() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe()
    }
  }

  @HostListener("swipe", ["$event"])
  onHostClick(event: Event) {
    console.dir(event)
  }

}
