import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "card-debug",
  templateUrl: "./card-debug.component.html",
  styleUrls: [ "./card-debug.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDebugComponent {}
