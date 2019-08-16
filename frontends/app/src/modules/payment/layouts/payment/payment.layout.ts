import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "payment-layout",
  templateUrl: "./payment.layout.html",
  styleUrls: [ "./payment.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentLayout {}
