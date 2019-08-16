import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "log",
  templateUrl: "./log.component.html",
  styleUrls: [ "./log.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent {}
