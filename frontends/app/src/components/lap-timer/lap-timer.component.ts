import { Component, ChangeDetectionStrategy, Input, OnChanges, ElementRef } from "@angular/core"

@Component({
  selector: "lap-timer",
  templateUrl: "./lap-timer.component.html",
  styleUrls: [ "./lap-timer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LapTimerComponent implements OnChanges {
  @Input()
  limit?: number

  constructor(
    private _el: ElementRef<HTMLElement>
  ){}

  ngOnChanges() {
    window.requestAnimationFrame(() => {
      this._el.nativeElement.style.setProperty("--limit", "0")
      this._el.nativeElement.style.setProperty("--animation", "none")
      window.requestAnimationFrame(() => {
        this._el.nativeElement.style.setProperty("--limit", String(this.limit || 0))
        this._el.nativeElement.style.setProperty("--animation", "lapProgress")
      })
    })
  }
}
