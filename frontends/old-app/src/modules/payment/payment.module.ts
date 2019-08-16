import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { WFormsModule } from "../w-forms"

import {
  CardComponent,
  LogComponent,
  TariffComponent,
} from "./components"

import { PaymentLayout } from "./layouts"

import { PaymentService } from "./services"

import { ROUTES } from "./payment.routing"

@NgModule({
  declarations: [
    CardComponent,
    LogComponent,
    TariffComponent,

    PaymentLayout,
  ],

  imports: [
    WFormsModule,
    RouterModule.forChild(ROUTES),
  ],

  providers: [
    PaymentService,
  ],
})
export class PaymentModule {}
