import { Injectable } from "@angular/core"

import { fromEvent } from "rxjs"

import { filter } from "rxjs/operators"

interface IFocusNode extends HTMLElement {
  disabled?: boolean
}

@Injectable({ providedIn: "root" })
export class FocusService {

  private _focusLoop: Array<IFocusNode> = new Array<IFocusNode>()
  private _activeNode?: IFocusNode

  private _blurFn!: (event: Event) => void

  constructor() {
    const self = this
    this._blurFn = function(_: Event) {
      self._updateFocus()
    }

    fromEvent<KeyboardEvent>(window, "keydown", { passive: false, capture: true }).pipe(
      filter(({key}) => !!key.match(/^TAB$/i)),
      filter(() => this._focusLoop.length > 0),
    ).subscribe(event => {
      event.preventDefault()
      event.stopPropagation()
      this._nextFocus()
    })
  }

  private _nextFocus() {
    let idx = this._focusLoop.findIndex(value => value === this._activeNode) + 1
    if (idx >= this._focusLoop.length) idx = 0

    this._activeNode = this._focusLoop[idx]
    if (this._activeNode.disabled) {
      idx = this._focusLoop.findIndex(value => !value.disabled, idx)
      if (idx < 0) idx = 0
      this._activeNode = this._focusLoop[idx]
    }


    if (this._activeNode) {
      this._activeNode.focus()
    }
  }

  private _updateFocus() {
    setTimeout(() => {
      const activeElement = document.activeElement as (IFocusNode | null)

      if (activeElement && this._focusLoop.includes(activeElement)) {
        this._activeNode = activeElement
        if (this._activeNode.disabled) return this._nextFocus()
        return
      }

      if (this._activeNode && this._focusLoop.includes(this._activeNode)) {
        if (this._activeNode.disabled) return this._nextFocus()
        this._activeNode.focus()
        return
      }

      this._activeNode = this._focusLoop[0]
      if (this._activeNode) {
        if (this._activeNode.disabled) return this._nextFocus()
        this._activeNode.focus()
      }
    }, 0)
  }

  registration(node: IFocusNode) {
    if (this._focusLoop.includes(node)) {
      return
    }

    node.addEventListener("blur", this._blurFn)
    this._focusLoop.push(node)
    this._updateFocus()
  }

  unregistration(node: IFocusNode) {
    const idx = this._focusLoop.indexOf(node)
    if (idx < 0) {
      return
    }

    node.removeEventListener("blur", this._blurFn)
    this._focusLoop.splice(idx, 1)
    this._updateFocus()
  }
}
