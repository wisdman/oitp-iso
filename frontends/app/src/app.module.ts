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
  CardInfoComponent,
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
  InputDirective,
  TezirovanieDirective,
  TouchableDirective,
} from "./directives"

import {
  AuthGuard,
  LoginGuard,
  LogoutGuard,
  RootRoutingGuard,
} from "./guards"

import {
  HTTPInterceptor,
} from "./interceptors"

import {
  ClubLayoutComponent,
  DashboardLayoutComponent,
  LoginLayoutComponent,
  LogLayoutComponent,
  MainLayoutComponent,
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
  CarpetService,
  FullscreenService,
  FullscreenServiceFactory,
  InfoService,
  KeypadService,
  KeypadServiceFactory,
  NotificationService,
  NotificationServiceFactory,
  PointerService,
  PointerServiceFactory,
  TimerService,
  TokenService,
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
  WordsColumnTrainerComponent,
  WordsLexisTrainerComponent,
  WordsPairsTrainerComponent,
  WordsQuestionCloseTrainerComponent,
  WordsQuestionWasteTrainerComponent,
} from "./trainers"

import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootLayoutComponent ],
  declarations: [
    RootLayoutComponent,

    CardChargerComponent,
    CardEverydayComponent,
    CardInfoComponent,
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
    InputDirective,
    TezirovanieDirective,
    TouchableDirective,

    ClubLayoutComponent,
    DashboardLayoutComponent,
    LoginLayoutComponent,
    LogLayoutComponent,
    MainLayoutComponent,
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
    WordsColumnTrainerComponent,
    WordsLexisTrainerComponent,
    WordsPairsTrainerComponent,
    WordsQuestionCloseTrainerComponent,
    WordsQuestionWasteTrainerComponent,
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [
    AuthGuard,
    LoginGuard,
    LogoutGuard,
    RootRoutingGuard,

    CarpetService,
    InfoService,
    TimerService,
    TokenService,
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
