import { Routes } from "@angular/router"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
  MainLayoutComponent,
  PaymentLayoutComponent,
  ProfileLayoutComponent,
  PublicationsLayoutComponent,
  RegisterLayoutComponent,
  SupportLayoutComponent,
  TrainingLayoutComponent,
} from "./layouts"

import {
  LogoutGuardService,
} from "./services"

export const ROUTES: Routes =
[{
  path: "",
  component: MainLayoutComponent,
  children: [{
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },{
    path: "club",
    component: ClubLayoutComponent,
    data: { title: "Клуб" },
  },{
    path: "dashboard",
    component: DashboardLayoutComponent,
    data: { title: "Личный кабинет" },
  },{
    path: "payment",
    component: PaymentLayoutComponent,
    data: { title: "Оплата" },
  },{
    path: "profile",
    component: ProfileLayoutComponent,
    data: { title: "Профиль" },
  },{
    path: "publications",
    component: PublicationsLayoutComponent,
    data: { title: "Учебные материалы" },
  },{
    path: "support",
    component: SupportLayoutComponent,
    data: { title: "Служба поддержки" },
  }]
},{
  path: "login",
  component: LoginLayoutComponent,
},{
  path: "logout",
  canActivate: [ LogoutGuardService ],
  component: LoginLayoutComponent,
},{
  path: "register",
  component: RegisterLayoutComponent,
},{
  path: "training/:type",
  component: TrainingLayoutComponent,
}]
