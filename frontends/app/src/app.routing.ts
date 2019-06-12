import { Routes } from "@angular/router"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
  MainLayoutComponent,
  PaymentLayoutComponent,
  ProfileLayoutComponent,
  PublicationsLayoutComponent,
  SupportLayoutComponent,
  TrainingLayoutComponent,
} from "./layouts"

import {
  AuthGuard,
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
  data: { signIn: true },
},{
  path: "logout",
  canActivate: [ LogoutGuard ],
  component: LoginLayoutComponent,
  data: { signIn: true },
},{
  path: "register",
  component: LoginLayoutComponent,
},{
  path: "training/:type",
  component: TrainingLayoutComponent,
  canActivate: [ RootRoutingGuard ],
}]
