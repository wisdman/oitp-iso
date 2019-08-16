import { Injectable, ComponentFactoryResolver, ViewContainerRef } from "@angular/core"

import { Subject } from "rxjs"
import { share } from "rxjs/operators"

import { NotificationMessagesComponent } from "../components"
import { IMessage } from "../interfaces"

const DEFAULT_MESSAGE_TIMEOUT = 5

@Injectable({ providedIn: "root" })
export class NotificationService {

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver
  ){}

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
  }

  load(): Promise<void> {
    return Promise.resolve()
  }

  injectContainer(_viewContainerRef: ViewContainerRef) {
    const factory = this._componentFactoryResolver.resolveComponentFactory(NotificationMessagesComponent)
    const component = factory.create(_viewContainerRef.injector)
    _viewContainerRef.insert(component.hostView)
  }

  private _systemNotification(header: string, message: string, image:string) {
    console.log(header, message, image)
  }

  notification(header: string, message: string, image:string = "") {
    console.log(header, message, image)

    if (this._allowNotification) {
      this._systemNotification(header, message, image)
    }
  }

  private _messages: Subject<IMessage> = new Subject<IMessage>()
  messages = this._messages.pipe(share())

  notice(message: string, timeOut: number = DEFAULT_MESSAGE_TIMEOUT) {
    this._messages.next({ type: "NOTICE", message, timeOut })
  }

  warning(message: string, timeOut: number = DEFAULT_MESSAGE_TIMEOUT) {
    this._messages.next({ type: "WARNING", message, timeOut })
  }

  error(message: string, timeOut: number = DEFAULT_MESSAGE_TIMEOUT) {
    this._messages.next({ type: "ERROR", message, timeOut })
  }

  httpError(status: number, timeOut: number = DEFAULT_MESSAGE_TIMEOUT) {
    this._messages.next({ type: "ERROR", message: `${status}: Непредвиденная ошибка сервера`, timeOut })
  }
}

export function NotificationServiceFactory(notificationService: NotificationService): Function {
  return () => notificationService.load()
}
