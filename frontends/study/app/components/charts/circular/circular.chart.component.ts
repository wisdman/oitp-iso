import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, OnInit} from "@angular/core"

@Component({
  selector: "circular-chart",
  templateUrl: "./circular.chart.component.html",
  styleUrls: [ "./circular.chart.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularChartComponent implements OnInit {

  @ViewChild("circleNode") matrixRef: ElementRef<SVGPathElement>

  @Input()
  value: number = 0

  ngOnInit() {
    this.matrixRef.nativeElement.style.setProperty("--value", `${this.value}`)
  }
}
