import { Routes } from "@angular/router"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
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
  InviteGuard,
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
  data: { mode: "login" },
},{
  path: "logout",
  canActivate: [ LogoutGuard ],
  component: LoginLayoutComponent,
  data: { mode: "login" },
},{
  path: "invite",
  component: LoginLayoutComponent,
  data: { mode: "invite" },
},{
  path: "invite/:id",
  canActivate: [ InviteGuard ],
  component: LoginLayoutComponent,
  data: { mode: "invite" },
},{
  path: "reset",
  component: LoginLayoutComponent,
  data: { mode: "reset" },
},{
  path: "training/:type",
  component: TrainingLayoutComponent,
  canActivate: [ RootRoutingGuard ],
}]
