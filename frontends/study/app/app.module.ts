import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import { registerLocaleData } from "@angular/common"
import localeRu from "@angular/common/locales/ru"
registerLocaleData(localeRu)

import {
  RootComponent,
  LoginRootLayoutComponent,
  MainRootLayoutComponent,
  TrainingRootLayoutComponent,
  TrainerRootLayoutComponent,

  СlubLayoutComponent,
  DashboardLayoutComponent,
  NewsLayoutComponent,
  PublicationsLayoutComponent,

  BrainChargeCardComponent,
  ChargerCardComponent,
  EducationalMaterialCardComponent,
  EverydayCardComponent,
  FiveDaysDiscountCardComponent,
  MainAreaCardComponent,
  MainChartCardComponent,
  TomorrowCardComponent,

  CircularChartComponent,

  TimelineComponent,

  ColorDictionariesTrainer,
  DifferencesTrainer,
  ImagePuzzleTrainer,
  ImageTablesTrainer,
  InfoTextTrainer,
  NumberTablesTrainer,
  PerceptionTrainer,
  QuestionTrainer,
  TextDictionariesTrainer,
  TextTablesTrainer,
} from "./components"

import {
  FilterPipe,
  TimerPipe,
} from "./pipes"

import {
  NotificationService,
  NotificationServiceFactory,
} from "./services"

import {
  ErrorInterceptor
} from "./interceptors"


import { ROUTES } from "./app.routing"

@NgModule({
  bootstrap: [ RootComponent ],
  declarations: [
    RootComponent,
    LoginRootLayoutComponent,
    MainRootLayoutComponent,
    TrainingRootLayoutComponent,
    TrainerRootLayoutComponent,

    СlubLayoutComponent,
    DashboardLayoutComponent,
    NewsLayoutComponent,
    PublicationsLayoutComponent,

    BrainChargeCardComponent,
    ChargerCardComponent,
    EducationalMaterialCardComponent,
    EverydayCardComponent,
    FiveDaysDiscountCardComponent,
    MainAreaCardComponent,
    MainChartCardComponent,
    TomorrowCardComponent,

    CircularChartComponent,

    TimelineComponent,

    ColorDictionariesTrainer,
    DifferencesTrainer,
    ImagePuzzleTrainer,
    ImageTablesTrainer,
    InfoTextTrainer,
    NumberTablesTrainer,
    PerceptionTrainer,
    QuestionTrainer,
    TextDictionariesTrainer,
    TextTablesTrainer,

    FilterPipe,
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
    NotificationService,

    // Notification services
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
