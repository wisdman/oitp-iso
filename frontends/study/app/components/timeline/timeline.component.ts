import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: [ "./timeline.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {}
