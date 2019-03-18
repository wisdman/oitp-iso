// Шульте

import { UUID } from "../uuid"

import {
  INumberTableTrainerConfig
} from "../../trainers"

export async function getNumberTableTrainerConfig(
                        tableSide: number,
                        last: number = tableSide * tableSide
                      ): Promise<INumberTableTrainerConfig> {

  const matrix = Array.from(Array(tableSide * tableSide), (_, i) => i+1)
                      .map(value => ({value, background: "#ffffff" }))
                      .sort(() => Math.random() - 0.5)

  return {
    id: "number-table",
    uid: new UUID(1).toString(),
    matrix,
    last,
  }
}