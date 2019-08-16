import { Component, ChangeDetectionStrategy } from "@angular/core"

import { DEBUG } from "../../app.config"

@Component({
  selector: "dashboard-layout",
  templateUrl: "./dashboard.layout.component.html",
  styleUrls: [ "./dashboard.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  debig = DEBUG
}
