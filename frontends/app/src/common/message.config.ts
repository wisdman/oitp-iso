import { UUID } from "./uuid"

import {
  IMessageTrainerConfig
} from "../trainers"


export async function getMessageConfig({
  header,
  text,
  button,
}:{
  header: string
  text: string
  button: string
}): Promise<IMessageTrainerConfig> {
  return {
    uid: new UUID(1).toString(),
    id: "message",
    header,
    body: text.split(/[\n\r]+/).map(t => `<p>${t}</p>`).join(""),
    button,
    timeLimit: 0,
  }
}
