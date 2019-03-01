import { Routes } from "@angular/router"

import {
  LoginRootLayoutComponent,
  MainRootLayoutComponent,
  TrainingRootLayoutComponent,
  TrainerRootLayoutComponent,

  СlubLayoutComponent,
  DashboardLayoutComponent,
  NewsLayoutComponent,
  PublicationsLayoutComponent,
} from "./components"

export const ROUTES: Routes =
[{
  path: "",
  component: MainRootLayoutComponent,
  children: [{
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },{
    path: "club",
    component: СlubLayoutComponent,
  },{
    path: "dashboard",
    component: DashboardLayoutComponent,
  },{
    path: "news",
    component: NewsLayoutComponent,
  },{
    path: "publications",
    component: PublicationsLayoutComponent,
  }]
},{
  path: "training",
  component: TrainingRootLayoutComponent,
},{
  path: "trainer",
  component: TrainerRootLayoutComponent,
},{
  path: "login",
  component: LoginRootLayoutComponent,
}]
