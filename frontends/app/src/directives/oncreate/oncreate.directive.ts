import {
  Directive,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[onCreate]'
})
export class OnCreateDirective {
   constructor(
    private _elRef: ElementRef<Element>,
  ){}

  @Output() onCreate: EventEmitter<Element> = new EventEmitter<Element>()

  ngOnInit() {
     this.onCreate.emit(this._elRef.nativeElement)
  }
}