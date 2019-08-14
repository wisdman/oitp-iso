import { NgModule } from "@angular/core"
// import { BrowserModule } from "@angular/platform-browser"

import {
  ButtonDirective,
  InputDirective,
} from "./directives"

import {
  FormService,
} from "./services"

@NgModule({
  declarations: [
    ButtonDirective,
    InputDirective,
  ],

  exports: [
    ButtonDirective,
    InputDirective,
  ],

  // imports: [
  //   BrowserModule,
  // ],

  providers: [
    FormService,
  ],
})
export class WFormsModule {}
