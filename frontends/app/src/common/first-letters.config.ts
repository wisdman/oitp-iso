import {
  ShuffleArray,
} from "./functions"

import { UUID } from "../uuid"


import {
  IFirstLettersTrainerConfig,
} from "../trainers"

export async function getFirstLettersConfig(): Promise<IFirstLettersTrainerConfig> {
  const DATA = await fetch(`/first-letters.txt`).then(response => response.text())

  const sentence = ShuffleArray(DATA.split(/[\n\r]+/))[0]

  return {
    uid: new UUID(1),
    id: "first-letters",
    mode: "show",
    sentence
  }
}
