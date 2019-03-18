// Классификатор цветов

import { UUID } from "../uuid"

import {
  IСolorsСlassificationTrainerConfig
} from "../../trainers"

export async function getСolorsСlassificationTrainerConfig(itemsSize: number): Promise<IСolorsСlassificationTrainerConfig> {

  const DATA = await fetch("/colors.json").then(response => response.json()) as { [name: string]: string }

  const items = Object.entries(DATA)
                      .sort(() => Math.random() - 0.5)
                      .slice(0, itemsSize)
                      .map(([title, rgb]) =>({title, rgb}))

  return {
    id: "colors-classification",
    uid: new UUID(1).toString(),
    items,
  }
}
