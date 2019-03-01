import {
  RandomInt,
  ShuffleArray,
  NewValueArray,
} from "./functions"

import { UUID } from "../uuid"

import {
  ICONS,
  fetchIcons,
} from "./icons"

import {
  IIconsTableTrainerConfig
} from "../trainers"

export async function getIconsTableConfig(): Promise<IIconsTableTrainerConfig> {
  const columns = RandomInt(2, 5)
  const rows = RandomInt(Math.max(2, columns - 1), Math.min(5, columns + 1))

  const iconsCount = RandomInt(2, Math.min(5, columns * rows))

  const items = await fetchIcons(ShuffleArray(ICONS["flat"]).slice(0, iconsCount))

  const matrix = NewValueArray(columns * rows, items).map(value => ({value}))

  return {
    uid: new UUID(1),
    id: "icons-table",
    mode: "show",
    columns,
    rows,
    items,
    matrix,
  }
}
