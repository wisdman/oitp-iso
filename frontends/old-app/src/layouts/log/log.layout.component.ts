import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "log-layout",
  templateUrl: "./log.layout.component.html",
  styleUrls: [ "./log.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogLayoutComponent {}
