import {
  fromEvent,
  merge,
} from "rxjs"

import {
  filter,
  map,
} from "rxjs/operators"

export const isPointerEvents = "PointerEvent" in window
export const isTouchEvents = "ontouchstart" in window

export interface IPointerEvent {
  target: EventTarget | null
  x: number
  y: number
  originalEvent: PointerEvent | TouchEvent | MouseEvent
}

export function initPointerDown(node: HTMLElement | SVGElement | Document) {
  return merge(
    fromEvent<PointerEvent>(node, "pointerdown", { passive: false, capture: true })
    .pipe(filter(event => event.isPrimary), map(fromPointerEvent)),
    fromEvent<TouchEvent>(node, "touchstart", { passive: false, capture: true })
    .pipe(filter(event => isPointerEvents && event.changedTouches.length === 1), map(fromTouchEvent)),
    fromEvent<MouseEvent>(node, "mousedown", { passive: false, capture: true })
    .pipe(filter(() => isPointerEvents && isTouchEvents), map(fromMouseEvent))
  )
}

export function initPointerMove(node: HTMLElement | SVGElement | Document) {
  return merge(
    fromEvent<PointerEvent>(node, "pointermove", { passive: false, capture: true })
    .pipe(filter(event => event.isPrimary), map(fromPointerEvent)),
    fromEvent<TouchEvent>(node, "touchmove", { passive: false, capture: true })
    .pipe(filter(event => isPointerEvents && event.changedTouches.length === 1), map(fromTouchEvent)),
    fromEvent<MouseEvent>(node, "mousemove", { passive: false, capture: true })
    .pipe(filter(() => isPointerEvents && isTouchEvents), map(fromMouseEvent))
  )
}

export function initPointerUp(node: HTMLElement | SVGElement | Document) {
  return merge(
    fromEvent<PointerEvent>(node, "pointerup", { passive: false, capture: true })
    .pipe(filter(event => event.isPrimary), map(fromPointerEvent)),
    fromEvent<TouchEvent>(node, "touchend", { passive: false, capture: true })
    .pipe(filter(event => isPointerEvents && event.changedTouches.length === 1), map(fromTouchEvent)),
    fromEvent<MouseEvent>(node, "mouseup", { passive: false, capture: true })
    .pipe(filter(() => isPointerEvents && isTouchEvents), map(fromMouseEvent))
  )
}

export function initPointerCancel(node: HTMLElement | SVGElement | Document) {
  return merge(
    fromEvent<PointerEvent>(node, "pointercancel", { passive: false, capture: true })
    .pipe(filter(event => event.isPrimary), map(fromPointerEvent)),
    fromEvent<TouchEvent>(node, "touchcancel", { passive: false, capture: true })
    .pipe(filter(event => isPointerEvents && event.changedTouches.length === 1), map(fromTouchEvent)),
  )
}

function fromPointerEvent(event: PointerEvent): IPointerEvent {
  return {
    target: event.target,
    x: event.clientX,
    y: event.clientY,
    originalEvent: event,
  }
}

function fromTouchEvent(event: TouchEvent): IPointerEvent {
  const touch = event.changedTouches[0]
  return {
    target: touch.target,
    x: touch.clientX,
    y: touch.clientY,
    originalEvent: event,
  }
}

function fromMouseEvent(event: MouseEvent): IPointerEvent {
  return {
    target: event.target,
    x: event.clientX,
    y: event.clientY,
    originalEvent: event,
  }
}
