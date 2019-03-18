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
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  LapTimerComponent,
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
  ImageCanvasTrainerComponent,
  ImageClassificationTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageFieldTrainerComponent,
  ImageSequenceTrainerComponent,
  ImageTableTrainerComponent,
  MessageTrainerComponent,
  NumberExclusionTrainerComponent,
  NumberExpressionTrainerComponent,
  NumberSeriesTrainerComponent,
  NumberShapeTrainerComponent,
  NumberTableTrainerComponent,
  QuestionTrainerComponent,
  ResultTrainerComponent,
  TextLettersTrainerComponent,
  TextTezirovanieTrainerComponent,
  WordsClassificationTrainerComponent,
  WordsExclusionTrainerComponent,
  WordsPairsTrainerComponent,
  WordsShapeTrainerComponent,
  СolorsСlassificationTrainerComponent,
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
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    LapTimerComponent,
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

    ImageCanvasTrainerComponent,
    ImageClassificationTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageFieldTrainerComponent,
    ImageSequenceTrainerComponent,
    ImageTableTrainerComponent,
    MessageTrainerComponent,
    NumberExclusionTrainerComponent,
    NumberExpressionTrainerComponent,
    NumberSeriesTrainerComponent,
    NumberShapeTrainerComponent,
    NumberTableTrainerComponent,
    QuestionTrainerComponent,
    ResultTrainerComponent,
    TextLettersTrainerComponent,
    TextTezirovanieTrainerComponent,
    WordsClassificationTrainerComponent,
    WordsExclusionTrainerComponent,
    WordsPairsTrainerComponent,
    WordsShapeTrainerComponent,
    СolorsСlassificationTrainerComponent,

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
