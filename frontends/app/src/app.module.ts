import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import {
  RootLayoutComponent,
} from "./app.root"

import {
  CircularChartComponent,
  LinearChartComponent,
} from "./charts"

import {
  CardChargerComponent,
  CardEverydayComponent,
  СardRecommendationsComponent,
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  LogComponent,
  SidebarUserComponent,
} from "./components"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
  MainLayoutComponent,
  PaymentLayoutComponent,
  ProfileLayoutComponent,
  PublicationsLayoutComponent,
  RegisterLayoutComponent,
  SupportLayoutComponent,
  TrainingLayoutComponent,
} from "./layouts"

import {
  DaysPipe,
  TimerPipe,
} from "./pipes"

import {
  LogoutGuardService,

  NotificationService,
  NotificationServiceFactory,

  LogService,
  UserService,
} from "./services"

import {
  ErrorInterceptor
} from "./interceptors"


import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootLayoutComponent ],
  declarations: [
    RootLayoutComponent,

    CircularChartComponent,
    LinearChartComponent,

    CardChargerComponent,
    CardEverydayComponent,
    СardRecommendationsComponent,
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    LogComponent,
    SidebarUserComponent,

    ClubLayoutComponent,
    DashboardLayoutComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    PaymentLayoutComponent,
    ProfileLayoutComponent,
    PublicationsLayoutComponent,
    RegisterLayoutComponent,
    SupportLayoutComponent,
    TrainingLayoutComponent,

    DaysPipe,
    TimerPipe,
  ],

  entryComponents: [

  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [
    LogoutGuardService,

    LogService,
    UserService,

    // Notification services
    NotificationService,
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

    {
      provide: LOCALE_ID,
      useValue: "ru"
    }
  ],
})
export class AppModule {}
