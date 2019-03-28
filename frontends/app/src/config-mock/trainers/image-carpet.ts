// Коврики

import { UUID } from "../uuid"

import {
  IImageCarpetTrainerConfig
} from "../../trainers"

const CARPETS_COUNT = 10
const CARPETS = Array.from(Array(CARPETS_COUNT), (_,i) => `/carpets/${i+1}.svg`)

function fetchCarpet(url: string) {
  return fetch(url)
          .then(response => response.text())
}

export async function getImageCarpetTrainerConfigs(
): Promise<[IImageCarpetTrainerConfig, IImageCarpetTrainerConfig]> {
  const carpetUrl = CARPETS.sort(() => Math.random() - 0.5)[0]
  const carpet = await fetchCarpet(carpetUrl)

  const config: IImageCarpetTrainerConfig = {
    id: "image-carpet",
    mode: "show",
    uid: new UUID(1).toString(),
    carpet,
  }

  return [config, {...config, mode: "play"}]
}