import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: [ "./card.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
