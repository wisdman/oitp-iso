import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "payment-log",
  templateUrl: "./payment-log.component.html",
  styleUrls: [ "./payment-log.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentLogComponent {}
