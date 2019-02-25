import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core"

@Component({
  selector: "circular-chart",
  templateUrl: "./circular.chart.component.html",
  styleUrls: [ "./circular.chart.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularChartComponent implements OnChanges {
  @ViewChild("circleNode") circleRef?: ElementRef<SVGPathElement>

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
