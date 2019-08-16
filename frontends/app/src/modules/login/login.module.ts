import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { ReactiveFormsModule } from "@angular/forms"

import { AppCommonModule } from "../common"
import { WFormsModule } from "../w-forms"

import {
  FormInviteComponent,
  FormLoginComponent,
  FormRestoreComponent,
} from "./components"

import { LoginLayout } from "./layouts"
import { LoginService } from "./services"

import { ROUTES } from "./login.routing"

@NgModule({
  declarations: [
    FormInviteComponent,
    FormLoginComponent,
    FormRestoreComponent,

    LoginLayout,
  ],

  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),

    AppCommonModule,
    WFormsModule,
  ],

  providers: [ LoginService ],
})
export class LoginModule {}
