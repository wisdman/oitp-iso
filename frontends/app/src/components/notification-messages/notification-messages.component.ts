import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core"

import { Subscription } from "rxjs"

import { IMessage } from "../../interfaces"

import { NotificationService } from "../../services"

@Component({
  selector: "notification-messages",
  templateUrl: "./notification-messages.component.html",
  styleUrls: [ "./notification-messages.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationMessagesComponent implements OnInit, OnDestroy {

  constructor(
    private _notificationService: NotificationService,
    private _cdr: ChangeDetectorRef,
  ){}

  messages: Array<IMessage> = []

  private _messagesSubscription!: Subscription

  ngOnInit() {
    if (this._messagesSubscription) this._messagesSubscription.unsubscribe()
    this._messagesSubscription = this._notificationService.messages.subscribe(message => {
      this.messages.push(message)
      this._cdr.markForCheck()
      setTimeout(() => {
        this.messages = this.messages.filter(item => item !== message)
        this._cdr.markForCheck()
      }, message.timeOut * 1000)
    })
  }

  ngOnDestroy() {
    if (this._messagesSubscription) this._messagesSubscription.unsubscribe()
  }

  delete(message: IMessage) {
    this.messages = this.messages.filter(item => item !== message)
  }
}