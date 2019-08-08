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
  CardDebugComponent,
  CardEverydayComponent,
  CardInfoComponent,
  ChartCircularComponent,
  ChartLinearComponent,
  HeaderNotificationsComponent,
  HeaderUserComponent,
  IndicatorBrainComponent,
  IndicatorChartsComponent,
  IndicatorSpeedComponent,
  LoginFormEmailComponent,
  LoginFormInviteComponent,
  LoginFormRestoreComponent,
  ProfileEmailComponent,
  ProfileMainComponent,
  ProfilePasswordComponent,
  ProgressListComponent,
  SidebarUserComponent,
  SocialBbuttonsComponent,
  TimerGlobalComponent,
  TimerLapComponent,
  TrainerSelectorComponent,
} from "./components"

import {
  AutofocusDirective,

  ButtonMainDirective,
  ButtonRoundDirective,
  ButtonTrainerDirective,
  InputMainDirective,
  InputTrainerDirective,

  KeyFilterDirective,
  OnCreateDirective,
  TezirovanieDirective,
  TouchableDirective,
} from "./directives"

import {
  AuthGuard,
  InviteGuard,
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
  LoginEmailLayoutComponent,
  LoginInviteLayoutComponent,
  LoginLayoutComponent,
  LoginRestoreLayoutComponent,
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
  FullscreenService,
  FullscreenServiceFactory,
  InfoService,
  KeypadService,
  NotificationService,
  NotificationServiceFactory,
  PointerService,
  PointerServiceFactory,
  ProgressService,
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
  ImageCarpetsTrainerComponent,
  ImageDifferencesTrainerComponent,
  ImageExpressionsPreviewTrainerComponent,
  ImageExpressionsTrainerComponent,
  ImageFieldsPreviewTrainerComponent,
  ImageFieldsQuestionTrainerComponent,
  MathEquationTrainerComponent,
  MathMiddleTrainerComponent,
  MathSequenceTrainerComponent,
  MathWasteTrainerComponent,
  MatrixImagesFillingTrainerComponent,
  MatrixImagesPreviewTrainerComponent,
  MatrixImagesQuestionTrainerComponent,
  MatrixSequenceFillingTrainerComponent,
  MatrixSequencePlayTrainerComponent,
  RelaxTrainerComponent,
  ResultTrainerComponent,
  SpaceQuestionWasteTrainerComponent,
  StorytellingTrainerComponent,
  TablePipeTrainerComponent,
  TextLettersPreviewTrainerComponent,
  TextLettersTrainerComponent,
  TextQuestionToFTrainerComponent,
  TextReadingTrainerComponent,
  TextTezirovanieTrainerComponent,
  WordsColumnTrainerComponent,
  WordsFillingTrainerComponent,
  WordsLexisTrainerComponent,
  WordsPairsTrainerComponent,
  WordsQuestionCloseTrainerComponent,
  WordsQuestionsWasteTrainerComponent,
} from "./trainers"

import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootLayoutComponent ],
  declarations: [
    RootLayoutComponent,

    CardChargerComponent,
    CardDebugComponent,
    CardEverydayComponent,
    CardInfoComponent,
    ChartCircularComponent,
    ChartLinearComponent,
    HeaderNotificationsComponent,
    HeaderUserComponent,
    IndicatorBrainComponent,
    IndicatorChartsComponent,
    IndicatorSpeedComponent,
    LoginFormEmailComponent,
    LoginFormInviteComponent,
    LoginFormRestoreComponent,
    ProfileEmailComponent,
    ProfileMainComponent,
    ProfilePasswordComponent,
    ProgressListComponent,
    SidebarUserComponent,
    SocialBbuttonsComponent,
    TimerGlobalComponent,
    TimerLapComponent,
    TrainerSelectorComponent,

    AutofocusDirective,

    ButtonMainDirective,
    ButtonRoundDirective,
    ButtonTrainerDirective,
    InputMainDirective,
    InputTrainerDirective,

    KeyFilterDirective,
    OnCreateDirective,
    TezirovanieDirective,
    TouchableDirective,

    ClubLayoutComponent,
    DashboardLayoutComponent,
    LoginEmailLayoutComponent,
    LoginInviteLayoutComponent,
    LoginLayoutComponent,
    LoginRestoreLayoutComponent,
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
    ImageCarpetsTrainerComponent,
    ImageDifferencesTrainerComponent,
    ImageExpressionsPreviewTrainerComponent,
    ImageExpressionsTrainerComponent,
    ImageFieldsPreviewTrainerComponent,
    ImageFieldsQuestionTrainerComponent,
    MathEquationTrainerComponent,
    MathMiddleTrainerComponent,
    MathSequenceTrainerComponent,
    MathWasteTrainerComponent,
    MatrixImagesFillingTrainerComponent,
    MatrixImagesPreviewTrainerComponent,
    MatrixImagesQuestionTrainerComponent,
    MatrixSequenceFillingTrainerComponent,
    MatrixSequencePlayTrainerComponent,
    RelaxTrainerComponent,
    ResultTrainerComponent,
    SpaceQuestionWasteTrainerComponent,
    StorytellingTrainerComponent,
    TablePipeTrainerComponent,
    TextLettersPreviewTrainerComponent,
    TextLettersTrainerComponent,
    TextQuestionToFTrainerComponent,
    TextReadingTrainerComponent,
    TextTezirovanieTrainerComponent,
    WordsColumnTrainerComponent,
    WordsFillingTrainerComponent,
    WordsLexisTrainerComponent,
    WordsPairsTrainerComponent,
    WordsQuestionCloseTrainerComponent,
    WordsQuestionsWasteTrainerComponent,
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
    InviteGuard,
    LoginGuard,
    LogoutGuard,
    RootRoutingGuard,

    InfoService,
    KeypadService,
    ProgressService,
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
