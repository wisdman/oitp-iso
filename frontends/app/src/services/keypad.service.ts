import { Injectable } from "@angular/core"

import {
  BehaviorSubject,
  Subject,
} from "rxjs"

import {
  filter,
  map,
  share,
} from "rxjs/operators"

export type IKeypadType = "RU" | "EN" | "NUMBERS"
export type IArrow = "DOWN" | "UP" | "LEFT" | "RIGHT"

const ARROW: Array<IArrow> = ["DOWN", "UP", "LEFT", "RIGHT"]
const RU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("")
const EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const NUMBERS = "1234567890".split("")
const SYMBOLS = "-!,.".split("")

@Injectable({ providedIn: "root" })
export class KeypadService {

  private readonly _isTouchDivice = "ontouchstart" in window || navigator.maxTouchPoints

  private _type: BehaviorSubject<IKeypadType | undefined> = new BehaviorSubject<IKeypadType | undefined>(undefined)
  show(value: IKeypadType) {
    this._type.next(value)
  }
  hide() {
    this._type.next(undefined)
  }

  type = this._type.pipe(map(value => this._isTouchDivice && value || undefined), share())

  private _isKeypadLocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  lockKeypad() {
    this._isKeypadLocked.next(true)
  }
  unlockKeypad() {
    this._isKeypadLocked.next(false)
  }

  private _events: Subject<string> = new Subject<string>()
  emit(value: string) {
    this._events.next(value)
  }

  events = this._events.pipe(share())

  arrow     = this.events.pipe(map(v => v as IArrow), filter(value => ARROW.includes(value)), share())
  backspace = this.events.pipe(filter(value => value === "BACKSPACE"), share())
  enter     = this.events.pipe(filter(value => value === "ENTER"), share())
  escape    = this.events.pipe(filter(value => value === "ESCAPE"), share())
  tab       = this.events.pipe(filter(value => value === "TAB"), share())
  dot       = this.events.pipe(filter(value => value === "."), share())
  space     = this.events.pipe(filter(value => value === " "), share())

  en      = this.events.pipe(filter(value => EN.includes(value)), share())
  ru      = this.events.pipe(filter(value => RU.includes(value)), share())
  symbols = this.events.pipe(filter(value => SYMBOLS.includes(value)), share())

  numbers = this.events.pipe(filter(value => NUMBERS.includes(value)),share())

  private _initKeydownListener() {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      switch (key) {
        case "DOWN":
        case "ARROWDOWN":
          this._events.next("DOWN")
          break

        case "UP":
        case "ARROWUP":
          this._events.next("UP")
          break

        case "LEFT":
        case "ARROWLEFT":
          this._events.next("LEFT")
          break

        case "RIGHT":
        case "ARROWRIGHT":
          this._events.next("RIGHT")
          break

        case "ESC":
        case "ESCAPE":
          this._events.next("ESCAPE")

        default:
          this._events.next(key)
          break
      }

      if (this._isKeypadLocked.getValue()) {
        event.preventDefault()
        event.stopPropagation()
      }

    }, { passive: false, capture: true })
  }

  load(): Promise<void> {
    this._initKeydownListener()
    return Promise.resolve()
  }
}

export function KeypadServiceFactory(keypadService: KeypadService): Function {
  return () => keypadService.load()
}