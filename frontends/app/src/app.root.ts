import { Component, ViewEncapsulation, ViewContainerRef, ViewChild, OnInit } from "@angular/core"

import { NotificationService } from "./services"

@Component({
  selector: "body",
  template: "<router-outlet></router-outlet><ng-template #notification></ng-template>",
  encapsulation: ViewEncapsulation.None
})
export class RootLayoutComponent implements OnInit {
  constructor(
    private _notificationService: NotificationService,
  ){}

  @ViewChild("notification", { read: ViewContainerRef, static: true }) _notificationRef!: ViewContainerRef

  ngOnInit() {
    this._notificationService.injectContainer(this._notificationRef)
  }
}