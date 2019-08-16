import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "main-dashboard",
  templateUrl: "./dashboard.layout.html",
  styleUrls: [ "./dashboard.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {}
