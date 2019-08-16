import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core"
import { APP_BASE_HREF } from "@angular/common"
import { BrowserModule } from "@angular/platform-browser"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"

import {
  WFormsModule,
} from "./modules/w-forms"

import { RootLayoutComponent } from "./app.root"

import {
  NotificationMessagesComponent,
} from "./components"

import {
  AuthGuard,
  LoginGuard,
  LogoutGuard,
  RootGuard,
} from "./guards"

import {
  HTTPInterceptor,
} from "./interceptors"

import {
  ConfigService,
  ConfigServiceFactory,
  FingerprintService,
  ModalService,
  NotificationService,
  NotificationServiceFactory,
  TokenService,
} from "./services"

import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootLayoutComponent ],
  declarations: [
    RootLayoutComponent,

    NotificationMessagesComponent,
  ],

  entryComponents: [
    NotificationMessagesComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),

    WFormsModule,
  ],

  providers: [
    AuthGuard,
    LoginGuard,
    LogoutGuard,
    RootGuard,

    FingerprintService,
    ModalService,
    NotificationService,
    TokenService,

    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigServiceFactory,
      deps: [ ConfigService ],
      multi: true
    },

    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: NotificationServiceFactory,
      deps: [ NotificationService ],
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true
    },

    {
      provide: LOCALE_ID,
      useValue: "ru"
    },

    {
      provide: APP_BASE_HREF,
      useValue: "/",
    },
  ],
})
export class AppModule {}
