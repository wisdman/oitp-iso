import { UUID } from "../uuid"

import {
  IQuestionTrainerConfig
} from "../../trainers"

export async function getMessageTrainerConfig({
  body,
  header = "",
  text = "",
  button = "Продолжить",
}:{
  body?: string
  header?: string,
  text?: string,
  button?: string,
}={}): Promise<IQuestionTrainerConfig> {

  if (body === undefined) {
    body = header ? `<h1>${header}</h1>` : ""
    body += text.split(/[\n\r]+/).map(t => `<p>${t}</p>`).join("")
  }

  return {
    id: "question",
    uid: new UUID(1).toString(),
    body, button,
  }
}