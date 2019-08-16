import { Routes } from "@angular/router"

import {
  DashboardLayout,
  MainLayout,
} from "./layouts"

import { ProgressResolveService } from "./services"

export const ROUTES: Routes =
[{
  path: "",
  component: MainLayout,
  children: [{
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },{
    path: "dashboard",
    component: DashboardLayout,
    data: { title: "Личный кабинет" },
    resolve: { hasProgress: ProgressResolveService },
  },{
    path: "payment",
    loadChildren: "../payment/payment.module#PaymentModule",
    data: { title: "Оплата" },
  }]
}]