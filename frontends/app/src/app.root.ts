import { Component, ViewEncapsulation } from "@angular/core"

@Component({
  selector: "body",
  template: "<router-outlet></router-outlet>",
  encapsulation: ViewEncapsulation.None
})
export class RootLayoutComponent {}