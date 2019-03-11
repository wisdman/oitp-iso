import { APP_INITIALIZER, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
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
  ContentBoxComponent,
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  LogComponent,
  SidebarUserComponent,
  СardRecommendationsComponent,
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
  ColorsColumnsTrainerComponent,
  FirstLettersTrainerComponent,
  ImageTableTrainerComponent,
  MessageTrainerComponent,
  NumberTableTrainerComponent,
  QuestionTrainerComponent,
  ResultsTrainerComponent,
  ShapeFieldTrainerComponent,
  WordsColumnsTrainerComponent,
} from "./trainers"

import {
  DaysPipe,
  TimerPipe,
} from "./pipes"

import {
  LogoutGuardService,

  NotificationService,
  NotificationServiceFactory,

  LogService,
  TrainingService,
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
    ContentBoxComponent,
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    LogComponent,
    SidebarUserComponent,
    СardRecommendationsComponent,

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

    ColorsColumnsTrainerComponent,
    FirstLettersTrainerComponent,
    ImageTableTrainerComponent,
    MessageTrainerComponent,
    NumberTableTrainerComponent,
    QuestionTrainerComponent,
    ResultsTrainerComponent,
    ShapeFieldTrainerComponent,
    WordsColumnsTrainerComponent,

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
    TrainingService,
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

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
