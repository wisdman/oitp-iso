// Последовательности картинок

import { UUID } from "../uuid"

import {
  IImageSequenceTrainerConfig
} from "../../trainers"

export async function getImageSequenceTrainerConfig(): Promise<IImageSequenceTrainerConfig> {

  return {
    id: "image-sequence",
    uid: new UUID(1).toString(),

    items: []
  }
}