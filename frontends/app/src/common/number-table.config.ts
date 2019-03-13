// import {
//   RandomInt,
// } from "./functions"

import { UUID } from "./uuid"

import {
  INumberTableTrainerConfig
} from "../trainers"

export async function getNumberTableConfig(size: number = 5): Promise<INumberTableTrainerConfig> {
  const columns = size
  const rows = size

  const max = columns * rows
  const matrix = Array.from(Array(max), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5)

  return {
    uid: new UUID(1).toString(),
    id: "number-table",
    columns,
    rows,
    last: max,
    matrix,
    timeLimit: 30,
  }
}
