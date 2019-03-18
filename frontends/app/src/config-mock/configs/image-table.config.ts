// Таблицы с картинками

import { UUID } from "../uuid"

import { fetchRandomIcons } from "../icons"

import {
  IImageTableTrainerConfig
} from "../../trainers"

export async function getImageTableTrainerConfig(tableSide: number, itemsSize: number): Promise<IImageTableTrainerConfig> {

  const items = await fetchRandomIcons(itemsSize)
  const matrix = Array.from(Array(tableSide * tableSide), () => Math.floor(Math.random() * items.length))

  return {
    id: "image-table",
    uid: new UUID(1).toString(),
    items,
    matrix,
  }
}
