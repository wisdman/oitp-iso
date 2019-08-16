import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

import { ChartsModule } from "../charts"
import { WFormsModule } from "../w-forms"

import {
  CardBlackboardComponent,
  CardBrainComponent,
  CardChargerComponent,
  CardChartsComponent,
  CardEverydayComponent,
  CardProgressComponent,
  CardProgressItemComponent,
  CardSpeedComponent,
  HeaderComponent,
  SidebarComponent,
} from "./components"

import {
  HamburgerDirective,
} from "./directives"

import {
  DashboardLayout,
  MainLayout,
} from "./layouts"

import {
  BlackboardService,
  ProgressService,
  SideBarService,
} from "./services"

import { ROUTES } from "./main.routing"

@NgModule({
  declarations: [
    CardBlackboardComponent,
    CardBrainComponent,
    CardChargerComponent,
    CardChartsComponent,
    CardEverydayComponent,
    CardProgressComponent,
    CardProgressItemComponent,
    CardSpeedComponent,
    HeaderComponent,
    SidebarComponent,

    HamburgerDirective,

    DashboardLayout,
    MainLayout,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

    ChartsModule,
    WFormsModule,
  ],

  providers: [
    BlackboardService,
    ProgressService,
    SideBarService,
  ],
})
export class MainModule {}
