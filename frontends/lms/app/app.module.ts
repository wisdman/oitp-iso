import { APP_INITIALIZER, NgModule } from "@angular/core"
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from "@angular/material"

import { ChartsModule } from "ng2-charts"

import {
  RootComponent,
  LoginRootLayoutComponent,
  MainRootLayoutComponent,

  DashboardLayoutComponent,

  SchoolsItemIndicatorsComponent,
  SchoolsItemLayoutComponent,
  SchoolsListLayoutComponent,

  UsersItemIndicatorsComponent,
  UsersItemInfoComponent,
  UsersItemLayoutComponent,
  UsersItemLogComponent,
  UsersListLayoutComponent,

  MessageComponent,
  StatisticsCardComponent,
} from "./components"

import {
  AvatarPipe,
  FilterPipe,
  RolePipe,
} from "./pipes"

import {
  NotificationService,
  NotificationServiceFactory,

  SchoolsService,
  UsersService,
} from "./services"

import {
  ErrorInterceptor
} from "./interceptors"


import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootComponent ],
  declarations: [
    RootComponent,
    LoginRootLayoutComponent,
    MainRootLayoutComponent,

    DashboardLayoutComponent,

    SchoolsItemIndicatorsComponent,
    SchoolsItemLayoutComponent,
    SchoolsListLayoutComponent,

    UsersItemIndicatorsComponent,
    UsersItemInfoComponent,
    UsersItemLayoutComponent,
    UsersItemLogComponent,
    UsersListLayoutComponent,

    MessageComponent,
    StatisticsCardComponent,

    AvatarPipe,
    FilterPipe,
    RolePipe,
  ],

  entryComponents: [
    MessageComponent,
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: "OITP-ISOV-LMS" }),
    BrowserTransferStateModule,

    RouterModule.forRoot(ROUTES),

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,

    ChartsModule,
  ],

  providers: [
    NotificationService,

    SchoolsService,
    UsersService,

    // Notification services
    {
      provide: APP_INITIALIZER,
      useFactory: NotificationServiceFactory,
      deps: [ NotificationService ],
      multi: true
    },

    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
})
export class AppModule {}
