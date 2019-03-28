import { Injectable } from "@angular/core"
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser"

import * as Hammer from "hammerjs"

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {
      direction: Hammer.DIRECTION_ALL,
    }
  }
}

export const HAMMER = {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: HammerConfig,
}