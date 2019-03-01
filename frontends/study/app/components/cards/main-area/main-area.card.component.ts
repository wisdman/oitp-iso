import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "main-area-card",
  templateUrl: "./main-area.card.component.html",
  styleUrls: [ "./main-area.card.component.css" ],
  host: {"class": "card"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAreaCardComponent {
  active: "left" | "right" = "left"
}
