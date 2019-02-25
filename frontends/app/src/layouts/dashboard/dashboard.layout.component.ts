import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "dashboard-layout",
  templateUrl: "./dashboard.layout.component.html",
  styleUrls: [ "./dashboard.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {}
