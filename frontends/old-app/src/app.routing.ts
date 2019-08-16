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

// import {
//   PaymentModule
// } from "./modules"

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
    loadChildren: "./modules/payment/payment.module#PaymentModule",
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
  redirectTo: "/login",
},{
  path: "training/:type",
  component: TrainingLayoutComponent,
  canActivate: [ RootRoutingGuard ],
}]