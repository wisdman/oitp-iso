import { NgModule } from "@angular/core"

import {
  WButtonDirective,
  WInputDirective,
} from "./directives"


@NgModule({
  declarations: [
    WButtonDirective,
    WInputDirective,
  ],

  exports: [
    WButtonDirective,
    WInputDirective,
  ],
})
export class WFormsModule {}
