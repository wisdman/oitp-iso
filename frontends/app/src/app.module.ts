import { APP_INITIALIZER, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import { DragDropModule } from "@angular/cdk/drag-drop"

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
  ClassificationTrainerComponent,
  ImageCarpetTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageFieldTrainerComponent,
  MatrixFillingTrainerComponent,
  MatrixSequenceTrainerComponent,
  QuestionTrainerComponent,
  ResultTrainerComponent,
  TablePipeTrainerComponent,
  TextLettersTrainerComponent,
  TextPairsTrainerComponent,
  TextSortTrainerComponent,
  TextTezirovanieTrainerComponent,
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
import { HAMMER } from "./hammer.config"

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

    TablePipeTrainerComponent,

    ClassificationTrainerComponent,
    ImageCarpetTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageFieldTrainerComponent,
    MatrixFillingTrainerComponent,
    MatrixSequenceTrainerComponent,
    QuestionTrainerComponent,
    ResultTrainerComponent,
    TablePipeTrainerComponent,
    TextLettersTrainerComponent,
    TextPairsTrainerComponent,
    TextSortTrainerComponent,
    TextTezirovanieTrainerComponent,

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

    DragDropModule,
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

    // Locale config
    {
      provide: LOCALE_ID,
      useValue: "ru"
    },

    // HammerJS config
    HAMMER,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
