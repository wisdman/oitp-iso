import { NgModule } from "@angular/core"

import {
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
