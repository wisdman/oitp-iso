// Классификация картинок

import { UUID } from "../uuid"

import {
  IImageClassificationTrainerConfig
} from "../../trainers"

export async function getImageClassificationTrainerConfig(): Promise<IImageClassificationTrainerConfig> {

  return {
    id: "image-classification",
    uid: new UUID(1).toString(),

    items: []
  }
}