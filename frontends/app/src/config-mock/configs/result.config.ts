// Последовательности картинок

import { UUID } from "../uuid"

import {
  IResultTrainerConfig
} from "../../trainers"

export async function getResultTrainerConfig(result: number): Promise<IResultTrainerConfig> {

  return {
    id: "result",
    uid: new UUID(1).toString(),
    result,
  }
}