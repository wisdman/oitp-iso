import {
  RandomInt,
  ShuffleArray,
  NewValueArray,
} from "../common/functions"

import {
  ICONS
} from "./icons"

import {
  IIconsTableConfig
} from "../"

export function getIconsTableRandomConfig(): IIconsTableConfig {
  const width = RandomInt(2, 7)
  const height = RandomInt(Math.max(2, width - 1), Math.min(7, width + 1))

  const iconsCount = RandomInt(2, Math.min(5, width * height))

  const items = ShuffleArray(ICONS["flat"]).slice(0, iconsCount)
  const matrix = NewValueArray(width * height, items).map(value => ({value}))

  return { id: "icons-table", mode: "show", width, height, items, matrix, timeLimit: 30 }
}
