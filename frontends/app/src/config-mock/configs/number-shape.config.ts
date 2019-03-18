// Фигуры с числами

import { UUID } from "../uuid"

import {
  INumberShapeTrainerConfig
} from "../../trainers"

export async function getNumberShapeTrainerConfig(): Promise<INumberShapeTrainerConfig> {

  return {
    id: "number-shape",
    uid: new UUID(1).toString(),
  }
}