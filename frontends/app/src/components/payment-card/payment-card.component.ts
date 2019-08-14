import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "payment-card",
  templateUrl: "./payment-card.component.html",
  styleUrls: [ "./payment-card.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardComponent {}
