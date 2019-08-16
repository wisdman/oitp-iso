import { NgModule } from "@angular/core"

import {
  AutofocusDirective,
  IfRouterLinkDirective,
  OnCreateDirective,
} from "./directives"

import {
  SafeHTMLPipe,
  SafeStylePipe,
  SafeURLPipe,
} from "./pipes"

@NgModule({
  declarations: [
    AutofocusDirective,
    IfRouterLinkDirective,
    OnCreateDirective,

    SafeHTMLPipe,
    SafeStylePipe,
    SafeURLPipe,
  ],

  exports: [
    IfRouterLinkDirective,
    OnCreateDirective,

    SafeHTMLPipe,
    SafeStylePipe,
    SafeURLPipe,
  ],
})
export class AppCommonModule {}
