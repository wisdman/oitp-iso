// Поиск отличий

import { UUID } from "../uuid"

import {
  IImageDifferencesTrainerConfig
} from "../../trainers"

export async function getImageDifferencesTrainerConfig(): Promise<IImageDifferencesTrainerConfig> {

  return {
    id: "image-differences",
    uid: new UUID(1).toString(),

    imageA: "",
    imageB: "",
  }
}