import {
  Directive,
  AfterContentInit,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutofocusDirective implements AfterContentInit {
   constructor(
    private _elRef: ElementRef<HTMLElement>,
  ){}

  ngAfterContentInit() {
    setTimeout(() => this._elRef.nativeElement.focus(), 500)
  }
}