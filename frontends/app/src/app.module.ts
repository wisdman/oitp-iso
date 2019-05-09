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
  CardRecommendationsComponent,
  GlobalTimerComponent,
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  LapTimerComponent,
  LogComponent,
  SidebarUserComponent,
  SocialBbuttonsComponent,
  TrainingGreetingComponent,
  TrainingResultComponent,
} from "./components"

import {
  ButtonDirective,
  FastTouchDirective,
} from "./directives"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
  MainLayoutComponent,
  PatternsLayoutComponent,
  PaymentLayoutComponent,
  ProfileLayoutComponent,
  PublicationsLayoutComponent,
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
  RelaxTrainerComponent,
  TablePipeTrainerComponent,
  TextLettersTrainerComponent,
  TextPairsTrainerComponent,
  TextReadingTrainerComponent,
  TextSortTrainerComponent,
  TextTezirovanieTrainerComponent,
} from "./trainers"

import {
  DaysPipe,
  TimerPipe,
  SafeStylePipe,
} from "./pipes"

import {
  LogoutGuardService,

  NotificationService,
  NotificationServiceFactory,

  LapTimerService,
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
    CardRecommendationsComponent,
    GlobalTimerComponent,
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    LapTimerComponent,
    LogComponent,
    SidebarUserComponent,
    SocialBbuttonsComponent,
    TrainingGreetingComponent,
    TrainingResultComponent,

    ButtonDirective,
    FastTouchDirective,

    ClubLayoutComponent,
    DashboardLayoutComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    PatternsLayoutComponent,
    PaymentLayoutComponent,
    ProfileLayoutComponent,
    PublicationsLayoutComponent,
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
    RelaxTrainerComponent,
    TablePipeTrainerComponent,
    TextLettersTrainerComponent,
    TextPairsTrainerComponent,
    TextReadingTrainerComponent,
    TextSortTrainerComponent,
    TextTezirovanieTrainerComponent,

    DaysPipe,
    TimerPipe,
    SafeStylePipe,
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

    LapTimerService,
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
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
