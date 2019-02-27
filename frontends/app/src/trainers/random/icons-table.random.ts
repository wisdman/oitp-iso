import {
  RandomInt,
  ShuffleArray,
  NewValueArray,
} from "../common/functions"

import {
  ICONS,
  fetchIcons,
} from "./icons"

import {
  IIconsTableConfig
} from "../"

export async function getIconsTableRandomConfig(): Promise<IIconsTableConfig> {
  const width = RandomInt(2, 7)
  const height = RandomInt(Math.max(2, width - 1), Math.min(7, width + 1))

  const iconsCount = RandomInt(2, Math.min(5, width * height))

  const items = await fetchIcons(ShuffleArray(ICONS["flat"]).slice(0, iconsCount))

  const matrix = NewValueArray(width * height, items).map(value => ({value}))

  return { id: "icons-table", mode: "show", width, height, items, matrix, timeLimit: 30 }
}
