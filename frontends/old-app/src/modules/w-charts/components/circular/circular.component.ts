import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core"

@Component({
  selector: "w-chart-circular",
  templateUrl: "./circular.component.html",
  styleUrls: [ "./circular.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularComponent implements OnChanges {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
  ) {}

  startAnimation: boolean = false

  @Input()
  value: number = 0

  private _valueOnChange() {
    this.startAnimation = false
    window.requestAnimationFrame(()=>{
      this._elRef.nativeElement.style.setProperty("--value", `${this.value}`)
      this.startAnimation = true
      this._cdr.markForCheck()
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("value" in changes) {
      this._valueOnChange()
    }
  }
}
