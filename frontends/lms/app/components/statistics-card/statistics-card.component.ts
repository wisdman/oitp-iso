import { Component, Input } from "@angular/core"

@Component({
  selector: "statistics-card",
  templateUrl: "./statistics-card.component.html",
  styleUrls: [ "./statistics-card.component.css" ],
})
export class StatisticsCardComponent {
  @Input() value: number = 0
  @Input() title: string = ""
  @Input() icon: string = ""
  @Input() trend: number = 0
}
