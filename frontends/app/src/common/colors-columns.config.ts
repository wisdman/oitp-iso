import {
  RandomInt,
  ShuffleArray,
} from "./functions"

import { UUID } from "../uuid"


import {
  IColorsColumnsTrainerConfig,
  IColorsColumnsTrainerColor,
} from "../trainers"

export async function getColorsColumnsConfig(): Promise<IColorsColumnsTrainerConfig> {
  const DATA = await fetch(`/colors.json`).then(response => response.json())

  let colors = ShuffleArray(Object.entries(DATA))
               .slice(0, RandomInt(6, 8))
               .map(([rgb, title]) => ({rgb: `#${rgb}`, title}) as IColorsColumnsTrainerColor)

  const columns = colors
                  .map(({rgb}) => rgb)

  colors = colors.slice(0,-1)

  return {
    uid: new UUID(1),
    id: "colors-columns",
    colors,
    columns,
  }
}
