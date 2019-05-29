import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core"

@Component({
  selector: "chart-circular",
  templateUrl: "./chart-circular.component.html",
  styleUrls: [ "./chart-circular.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartCircularComponent implements OnChanges {
  @ViewChild("circleNode", { static: true }) circleRef?: ElementRef<SVGPathElement>

  @Input()
  value: number = 0

  private _valueOnChange() {
    window.requestAnimationFrame(()=>{
      if (this.circleRef && this.circleRef.nativeElement) {
        this.circleRef.nativeElement.style.setProperty("--value", `${this.value}`)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("value" in changes) {
      this._valueOnChange()
    }
  }
}
