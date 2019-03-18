// Память

import { UUID } from "../uuid"

import { fetchRandomIcons } from "../icons"

import {
  IImageFieldTrainerConfig
} from "../../trainers"

export async function getImageFieldTrainerConfig(itemsSize: number): Promise<IImageFieldTrainerConfig> {

  const items = await fetchRandomIcons(itemsSize)

  return {
    id: "image-field",
    uid: new UUID(1).toString(),
    items,
  }
}