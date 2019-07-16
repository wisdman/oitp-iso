import { Injectable } from "@angular/core"

import {
  fromEvent,
  Observable,
} from "rxjs"

import {
  map,
  share,
} from "rxjs/operators"

export interface IKeyboardEvent {
  key: string
  originalEvent: KeyboardEvent
}

@Injectable({ providedIn: "root" })
export class KeypadService {

  private _keydownObservable:Observable<KeyboardEvent> =
    fromEvent<KeyboardEvent>(window, "keydown", { passive: false, capture: true }).pipe(share())

  keydown: Observable<IKeyboardEvent> = this._keydownObservable.pipe(
    map(event => {
      var key = event.key
      var keyUpperCase = key.toUpperCase()

      // Fix some key
      switch (keyUpperCase) {
        case "DOWN":
        case "ARROWDOWN":
          key = "DOWN"
          break

        case "UP":
        case "ARROWUP":
          key = "UP"
          break

        case "LEFT":
        case "ARROWLEFT":
          key = "LEFT"
          break

        case "RIGHT":
        case "ARROWRIGHT":
          key = "RIGHT"
          break

        case "ESC":
        case "ESCAPE":
          key = "ESCAPE"

        case "BACKSPACE":
        case "ENTER":
        case "TAB":
          key = keyUpperCase
      }

      return { key, originalEvent: event }

    }),
    share()
  )
}
