import { NgModule } from "@angular/core"

import { WChartsModule } from "../w-charts"


import {
  CardBrainComponent,
  CardChartsComponent,
  CardChartsItemComponent,
  CardLogComponent,
  CardProgressComponent,
  CardProgressItemComponent,
  CardSpeedComponent,
} from "./components"

import { LoglayoutComponent } from "./layouts"

import { ProgressService } from "./services"

@NgModule({
  declarations: [
    CardBrainComponent,
    CardChartsComponent,
    CardChartsItemComponent,
    CardLogComponent,
    CardProgressComponent,
    CardProgressItemComponent,
    CardSpeedComponent,

    LoglayoutComponent,
  ],

  exports: [
    CardBrainComponent,
    CardChartsComponent,
    CardProgressComponent,
    CardSpeedComponent,
    LoglayoutComponent,
  ],

  imports: [
    WChartsModule,
  ],

  providers: [
    ProgressService,
  ],
})
export class ProgressModule {}
