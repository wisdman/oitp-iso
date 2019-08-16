import { Routes } from "@angular/router"

import {
  FormInviteComponent,
  FormLoginComponent,
  FormRestoreComponent,
} from "./components"

import { LoginLayout } from "./layouts"

export const ROUTES: Routes =
[{
  path: "",
  component: LoginLayout,
  children: [{
    path: "",
    pathMatch: "full",
    component: FormLoginComponent,
  },{
    path: "invite",
    component: FormInviteComponent,
  },{
    path: "restore",
    component: FormRestoreComponent,
  }]
}]
