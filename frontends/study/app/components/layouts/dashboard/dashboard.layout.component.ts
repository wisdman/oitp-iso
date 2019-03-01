import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "dashboard-layout",
  templateUrl: "./dashboard.layout.component.html",
  styleUrls: [ "./dashboard.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  brainCharge: number = Number.parseInt(localStorage.getItem("brainCharge") || "") || 69
  isEverydayEnded: boolean = localStorage.getItem("isEverydayEnded") !== null
  fiveDaysDiscount: number = Number.parseInt(localStorage.getItem("fiveDaysDiscount") || "") || 1
}
