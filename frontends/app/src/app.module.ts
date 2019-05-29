import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core"
import { APP_BASE_HREF } from "@angular/common"
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
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  KeypadComponent,
  ProgressListComponent,
  SidebarUserComponent,
  SocialBbuttonsComponent,
  TimerGlobalComponent,
  TimerLapComponent,
  TrainerButtonComponent,
  TrainerInputComponent,
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
  AbstractTrainerComponent,
  ClassificationTrainerComponent,
  ImageCarpetTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageExpressionsTrainerComponent,
  ImageFieldTrainerComponent,
  MathEquationTrainerComponent,
  MathPuzzleTrainerComponent,
  MatrixFillingTrainerComponent,
  MatrixSequenceTrainerComponent,
  QuestionTrainerComponent,
  RelaxTrainerComponent,
  TablePipeTrainerComponent,
  TableWordsTrainerComponent,
  TextLettersTrainerComponent,
  TextReadingTrainerComponent,
  WordsColumnsTrainerComponent,
  WordsPairsTrainerComponent,
} from "./trainers"

import {
  DaysPipe,
  TimerPipe,
  SafeStylePipe,
} from "./pipes"

import {
  FullscreenService,
  FullscreenServiceFactory,

  KeypadService,
  KeypadServiceFactory,

  NotificationService,
  NotificationServiceFactory,

  ProgressService,
  RecommendationService,
  TimerLapService,
  TimerService,
  TrainingService,
  UserService,
} from "./services"

import {
  AuthGuard,
  LogoutGuard,
  TrainingRoutingGuard,
} from "./guards"

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
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    KeypadComponent,
    ProgressListComponent,
    SidebarUserComponent,
    SocialBbuttonsComponent,
    TimerGlobalComponent,
    TimerLapComponent,
    TrainerButtonComponent,
    TrainerInputComponent,
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

    AbstractTrainerComponent,
    ClassificationTrainerComponent,
    ImageCarpetTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageExpressionsTrainerComponent,
    ImageFieldTrainerComponent,
    MathEquationTrainerComponent,
    MathPuzzleTrainerComponent,
    MatrixFillingTrainerComponent,
    MatrixSequenceTrainerComponent,
    QuestionTrainerComponent,
    RelaxTrainerComponent,
    TablePipeTrainerComponent,
    TablePipeTrainerComponent,
    TableWordsTrainerComponent,
    TextLettersTrainerComponent,
    TextReadingTrainerComponent,
    WordsColumnsTrainerComponent,
    WordsPairsTrainerComponent,

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
    AuthGuard,
    LogoutGuard,
    TrainingRoutingGuard,

    ProgressService,
    RecommendationService,
    TimerLapService,
    TimerService,
    TrainingService,
    UserService,

    // Fullscreen services
    FullscreenService,
    {
      provide: APP_INITIALIZER,
      useFactory: FullscreenServiceFactory,
      deps: [ FullscreenService ],
      multi: true
    },

    // Fullscreen services
    KeypadService,
    {
      provide: APP_INITIALIZER,
      useFactory: KeypadServiceFactory,
      deps: [ KeypadService ],
      multi: true
    },

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

    // App base
    {
      provide: APP_BASE_HREF,
      useValue: "/",
    },
  ],
})
export class AppModule {}
