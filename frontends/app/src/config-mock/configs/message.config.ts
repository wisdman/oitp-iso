// Последовательности картинок

import { UUID } from "../uuid"

import {
  IMessageTrainerConfig
} from "../../trainers"

export async function getMessageTrainerConfig({
  header = "",
  text = "",
  button = "Продолжить",
}:{
  header: string,
  text: string,
  button: string,
}): Promise<IMessageTrainerConfig> {

  return {
    id: "message",
    uid: new UUID(1).toString(),
    header,
    body: text.split(/[\n\r]+/).map(t => `<p>${t}</p>`).join(""),
    button
  }
}