import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class NotificationService {

  private _allowNotification: boolean = false

  init() {
    switch ((<any>window).Notification.permission) {
      case "granted":
        this._allowNotification = true
        return

      case "denied":
        this._allowNotification = false
        return

      default:
        Notification.requestPermission( permission => {
          this._allowNotification = permission === "granted"
        })
    }

    if (!this._allowNotification) {
      console.error("Notification service error!")
    }
  }

  load(): Promise<void> {
    return Promise.resolve()
  }

  message(message: string) {
    console.log(message)
  }
}

export function NotificationServiceFactory(notificationService: NotificationService): Function {
  return () => notificationService.load()
}
