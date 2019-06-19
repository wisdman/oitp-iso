import { Injectable } from "@angular/core"

import { filter } from "rxjs/operators"

import { KeypadService } from "./keypad.service"

@Injectable({ providedIn: "root" })
export class FocusService {

  private _focusLoop: Array<HTMLElement> = new Array<HTMLElement>()
  private _activeNode?: HTMLElement

  private _blurFn!: (event: FocusEvent) => void

  constructor(
    private _keypadService: KeypadService
  ) {
    const self = this
    this._blurFn = function(_: FocusEvent) {
      self._updateFocus()
    }

    this._keypadService.keydown.pipe(
      filter(({key}) => key === "TAB"),
      filter(() => this._focusLoop.length > 0),
    ).subscribe(event => {
      event.originalEvent.preventDefault()
      event.originalEvent.stopPropagation()
      this._nextFocus()
    })
  }

  private _nextFocus() {
    let idx = this._focusLoop.findIndex(value => value === this._activeNode) + 1
    if (idx >= this._focusLoop.length) {
      idx = 0
    }

    this._activeNode = this._focusLoop[idx]
    if (this._activeNode) {
      this._activeNode.focus()
    }
  }

  private _updateFocus() {
    setTimeout(() => {
      const activeElement = document.activeElement as (HTMLElement | null)

      if (activeElement && this._focusLoop.includes(activeElement)) {
        this._activeNode = activeElement
        return
      }

      if (this._activeNode && this._focusLoop.includes(this._activeNode)) {
        this._activeNode.focus()
        return
      }

      this._activeNode = this._focusLoop[0]
      if (this._activeNode) {
        this._activeNode.focus()
      }
    }, 0)
  }

  registration(node: HTMLElement) {
    if (this._focusLoop.includes(node)) {
      return
    }

    node.addEventListener("blur", this._blurFn)
    this._focusLoop.push(node)
    this._updateFocus()
  }

  unregistration(node: HTMLElement) {
    const idx = this._focusLoop.indexOf(node)
    if (idx < 0) {
      return
    }

    node.removeEventListener("blur", this._blurFn)
    this._focusLoop.splice(idx, 1)
    this._updateFocus()
  }
}
