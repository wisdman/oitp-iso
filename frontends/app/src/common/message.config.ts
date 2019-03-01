import { UUID } from "../uuid"

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
    uid: new UUID(1),
    id: "message",
    header,
    text: text.split(/[\n\r]+/),
    button,
    timeLimit: 0,
  }
}
