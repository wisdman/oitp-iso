import {
  RandomInt,
} from "./functions"

import { UUID } from "../uuid"

import {
  INumberTableTrainerConfig
} from "../trainers"

export async function getNumberTableConfig(): Promise<INumberTableTrainerConfig> {
  const columns = RandomInt(3, 5)
  const rows = RandomInt(Math.max(2, columns - 1), Math.min(5, columns + 1))

  const max = columns * rows
  const matrix = Array.from(Array(max), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5)

  return {
    uid: new UUID(1),
    id: "number-table",
    columns,
    rows,
    last: max,
    matrix
  }
}
