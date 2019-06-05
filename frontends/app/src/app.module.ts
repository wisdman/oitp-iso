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
  CardChargerComponent,
  CardEverydayComponent,
  CardRecommendationsComponent,
  ChartCircularComponent,
  ChartLinearComponent,
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
  TrainerInputWrapperComponent,
  TrainerSelectorComponent,
  TrainingGreetingComponent,
  TrainingResultComponent,
} from "./components"

import {
  ButtonDirective,
  FastTouchDirective,
  TezirovanieDirective,
  TouchableDirective,
} from "./directives"

import {
  AuthGuard,
  LogoutGuard,
  TrainingRoutingGuard,
} from "./guards"

import {
  ErrorInterceptor
} from "./interceptors"

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
  PointerService,
  PointerServiceFactory,
  ProgressService,
  RecommendationService,
  TimerService,
  TrainingService,
  UserService,
} from "./services"

import {
  AbstractTrainerComponent,
  ClassificationColorsTrainerComponent,
  ClassificationDefinitionsTrainerComponent,
  ClassificationWordsTrainerComponent,
  ImageCarpetTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageExpressionsTrainerComponent,
  ImageFieldTrainerComponent,
  ImageFieldQuestionTrainerComponent,
  MathEquationTrainerComponent,
  MathMiddleTrainerComponent,
  MathSequenceTrainerComponent,
  MathWasteTrainerComponent,
  MatrixFillingTrainerComponent,
  MatrixFillingQuestionTrainerComponent,
  MatrixSequenceTrainerComponent,
  RelaxTrainerComponent,
  TablePipeTrainerComponent,
  TableWordsTrainerComponent,
  TextLettersTrainerComponent,
  TextQuestionTrainerComponent,
  TextReadingTrainerComponent,
  TextTezirovanieTrainerComponent,
  WordsColumnsTrainerComponent,
  WordsPairsTrainerComponent,
} from "./trainers"

import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootLayoutComponent ],
  declarations: [
    RootLayoutComponent,

    CardChargerComponent,
    CardEverydayComponent,
    CardRecommendationsComponent,
    ChartCircularComponent,
    ChartLinearComponent,
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
    TrainerInputWrapperComponent,
    TrainerSelectorComponent,
    TrainingGreetingComponent,
    TrainingResultComponent,

    ButtonDirective,
    FastTouchDirective,
    TezirovanieDirective,
    TouchableDirective,

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

    DaysPipe,
    TimerPipe,
    SafeStylePipe,

    AbstractTrainerComponent,
    ClassificationColorsTrainerComponent,
    ClassificationDefinitionsTrainerComponent,
    ClassificationWordsTrainerComponent,
    ImageCarpetTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageExpressionsTrainerComponent,
    ImageFieldTrainerComponent,
    ImageFieldQuestionTrainerComponent,
    MathEquationTrainerComponent,
    MathMiddleTrainerComponent,
    MathSequenceTrainerComponent,
    MathWasteTrainerComponent,
    MatrixFillingTrainerComponent,
    MatrixFillingQuestionTrainerComponent,
    MatrixSequenceTrainerComponent,
    RelaxTrainerComponent,
    TablePipeTrainerComponent,
    TablePipeTrainerComponent,
    TableWordsTrainerComponent,
    TextLettersTrainerComponent,
    TextQuestionTrainerComponent,
    TextReadingTrainerComponent,
    TextTezirovanieTrainerComponent,
    WordsColumnsTrainerComponent,
    WordsPairsTrainerComponent,
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
    TimerService,
    TrainingService,
    UserService,

    FullscreenService,
    {
      provide: APP_INITIALIZER,
      useFactory: FullscreenServiceFactory,
      deps: [ FullscreenService ],
      multi: true
    },

    KeypadService,
    {
      provide: APP_INITIALIZER,
      useFactory: KeypadServiceFactory,
      deps: [ KeypadService ],
      multi: true
    },

    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: NotificationServiceFactory,
      deps: [ NotificationService ],
      multi: true
    },

    PointerService,
    {
      provide: APP_INITIALIZER,
      useFactory: PointerServiceFactory,
      deps: [ PointerService ],
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
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
