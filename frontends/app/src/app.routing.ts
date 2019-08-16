import { Routes } from "@angular/router"
import {
  AuthGuard,
  LoginGuard,
  LogoutGuard,
  RootGuard,
} from "./guards"

export const ROUTES: Routes =
[{
  path: "",
  canActivate: [ AuthGuard ],
  loadChildren: "./modules/main/main.module#MainModule",
},{
  path: "login",
  canActivate: [ LoginGuard ],
  loadChildren: "./modules/login/login.module#LoginModule",
},{
  path: "logout",
  canActivate: [ LogoutGuard ],
  redirectTo: "/login",
},{
  path: "training",
  canActivate: [ RootGuard ],
  loadChildren: "./modules/training/training.module#TrainingModule",
}]