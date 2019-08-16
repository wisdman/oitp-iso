import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, OnChanges } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { Subscription, merge, of } from "rxjs"
import { filter } from "rxjs/operators"

@Directive({
  selector: "[ifRouterLink]",
})
export class IfRouterLinkDirective implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _router: Router,
    private _templateRef: TemplateRef<unknown>,
    private _viewContainerRef: ViewContainerRef,
  ){}

  private _routerLinks: Array<string> = []

  @Input()
  set ifRouterLink(value: string | Array<string>) {
    this._routerLinks = Array.isArray(value) ? value : [value]
  }

  private _routeSubscription!: Subscription

  ngOnInit() {
    if (this._routeSubscription) this._routeSubscription.unsubscribe()
    this._routeSubscription = merge(
      of(undefined),
      this._router.events,
    ).pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => this._updateView())
  }

  ngOnDestroy() {
    if (this._routeSubscription) this._routeSubscription.unsubscribe()
  }

  ngOnChanges() {
    this._updateView()
  }

  private _updateView() {
    this._viewContainerRef.clear()
    if (this._routerLinks.some(routeLink =>  this._router.isActive(routeLink, true))) {
      this._viewContainerRef.createEmbeddedView(this._templateRef)
    }
  }
}