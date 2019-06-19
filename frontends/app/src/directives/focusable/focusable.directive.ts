import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { FocusService } from "../../services"

@Directive({
  selector: "[focusable]"
})
export class FocusableDirective implements OnInit, OnDestroy {

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _focusService: FocusService,
  ) {}

  ngOnInit() {
    this._focusService.registration(this._elRef.nativeElement)
  }

  ngOnDestroy() {
    this._focusService.unregistration(this._elRef.nativeElement)
  }
}
