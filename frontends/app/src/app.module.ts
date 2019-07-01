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
  ProgressListComponent,
  SidebarUserComponent,
  SocialBbuttonsComponent,
  TimerGlobalComponent,
  TimerLapComponent,
  TrainerSVGWrapperComponent,
  TrainerSelectorComponent,
} from "./components"

import {
  ButtonDirective,
  FocusableDirective,
  InputDirective,
  KeyFilterDirective,
  OnCreateDirective,
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
  ProgressItemsFilterPipe,
  SafeStylePipe,
  TimerPipe,
} from "./pipes"

import {
  CarpetService,
  FocusService,
  FullscreenService,
  FullscreenServiceFactory,
  InfoService,
  KeypadService,
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
  GreetingTrainerComponent,
  ImageCarpetTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageExpressionsQuestionTrainerComponent,
  ImageExpressionsTrainerComponent,
  ImageFieldQuestionTrainerComponent,
  ImageFieldTrainerComponent,
  MathEquationTrainerComponent,
  MathMiddleTrainerComponent,
  MathSequenceTrainerComponent,
  MathWasteTrainerComponent,
  MatrixFillingQuestionTrainerComponent,
  MatrixFillingTrainerComponent,
  MatrixSequenceTrainerComponent,
  RelaxTrainerComponent,
  ResultTrainerComponent,
  SpaceQuestionWasteTrainerComponent,
  StorytellingQuestionTrainerComponent,
  StorytellingTrainerComponent,
  TablePipeTrainerComponent,
  TableWordsTrainerComponent,
  TextLettersTrainerComponent,
  TextReadingQuestionTrainerComponent,
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
    ProgressListComponent,
    SidebarUserComponent,
    SocialBbuttonsComponent,
    TimerGlobalComponent,
    TimerLapComponent,
    TrainerSVGWrapperComponent,
    TrainerSelectorComponent,

    ButtonDirective,
    FocusableDirective,
    InputDirective,
    KeyFilterDirective,
    OnCreateDirective,
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
    ProgressItemsFilterPipe,
    SafeStylePipe,
    TimerPipe,

    AbstractTrainerComponent,
    ClassificationColorsTrainerComponent,
    ClassificationDefinitionsTrainerComponent,
    ClassificationWordsTrainerComponent,
    GreetingTrainerComponent,
    ImageCarpetTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageExpressionsQuestionTrainerComponent,
    ImageExpressionsTrainerComponent,
    ImageFieldQuestionTrainerComponent,
    ImageFieldTrainerComponent,
    MathEquationTrainerComponent,
    MathMiddleTrainerComponent,
    MathSequenceTrainerComponent,
    MathWasteTrainerComponent,
    MatrixFillingQuestionTrainerComponent,
    MatrixFillingTrainerComponent,
    MatrixSequenceTrainerComponent,
    RelaxTrainerComponent,
    ResultTrainerComponent,
    SpaceQuestionWasteTrainerComponent,
    StorytellingQuestionTrainerComponent,
    StorytellingTrainerComponent,
    TablePipeTrainerComponent,
    TablePipeTrainerComponent,
    TableWordsTrainerComponent,
    TextLettersTrainerComponent,
    TextReadingQuestionTrainerComponent,
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
    FocusService,
    InfoService,
    KeypadService,
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
