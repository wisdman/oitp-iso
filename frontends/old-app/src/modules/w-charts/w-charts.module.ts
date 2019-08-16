import { NgModule } from "@angular/core"

import {
  CircularComponent,
  LinearComponent,
} from "./components"

@NgModule({
  declarations: [
    CircularComponent,
    LinearComponent,
  ],

  exports: [
    CircularComponent,
    LinearComponent,
  ],
})
export class WChartsModule {}
