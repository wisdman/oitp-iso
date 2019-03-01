import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "tomorrow-card",
  templateUrl: "./tomorrow.card.component.html",
  styleUrls: [ "./tomorrow.card.component.css" ],
  host: {
    "class": "card",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TomorrowCardComponent {}
