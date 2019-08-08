import { Routes } from "@angular/router"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginEmailLayoutComponent,
  LoginInviteLayoutComponent,
  LoginLayoutComponent,
  LoginRestoreLayoutComponent,
  LogLayoutComponent,
  MainLayoutComponent,
  PaymentLayoutComponent,
  ProfileLayoutComponent,
  PublicationsLayoutComponent,
  SupportLayoutComponent,
  TrainingLayoutComponent,
} from "./layouts"

import {
  AuthGuard,
  LoginGuard,
  LogoutGuard,
  RootRoutingGuard,
} from "./guards"

export const ROUTES: Routes =
[{
  path: "",
  component: MainLayoutComponent,
  canActivate: [ AuthGuard ],
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
    path: "log",
    component: LogLayoutComponent,
    data: { title: "История занятий" },
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
  canActivate: [ LoginGuard ],
  component: LoginLayoutComponent,
  children: [{
    path: "",
    component: LoginEmailLayoutComponent,
    pathMatch: "full",
  },{
    path: "invite",
    component: LoginInviteLayoutComponent,
  },{
    path: "restore",
    component: LoginRestoreLayoutComponent,
  }]
},{
  path: "logout",
  canActivate: [ LogoutGuard ],
  component: LoginLayoutComponent,
  data: { mode: "login" },
},{
  path: "training/:type",
  component: TrainingLayoutComponent,
  canActivate: [ RootRoutingGuard ],
}]