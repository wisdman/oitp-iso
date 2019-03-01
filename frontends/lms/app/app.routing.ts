import { Routes } from "@angular/router"

import {
  LoginRootLayoutComponent,
  MainRootLayoutComponent,

  DashboardLayoutComponent,
  SchoolsItemLayoutComponent,
  SchoolsListLayoutComponent,
  UsersItemLayoutComponent,
  UsersListLayoutComponent,
} from "./components"

export const ROUTES: Routes =
[{
  path: "",
  component: MainRootLayoutComponent,
  children: [{
    path: "",
    component: DashboardLayoutComponent,
  },{
    path: "schools",
    component: SchoolsListLayoutComponent,
  },{
    path: "schools/:id",
    component: SchoolsItemLayoutComponent,
  },{
    path: "users",
    component: UsersListLayoutComponent,
  },{
    path: "users/:id",
    component: UsersItemLayoutComponent,
  }]
},{
  path: "login",
  component: LoginRootLayoutComponent,
}]
