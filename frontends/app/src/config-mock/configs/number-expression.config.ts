// Уравнения

import { UUID } from "../uuid"

import {
  INumberExpressionTrainerConfig
} from "../../trainers"

const randomAction = () => ["+","-","*","/"][Math.floor(Math.random() * 4)]

export async function getNumberExpressionTrainerConfig(x: number): Promise<INumberExpressionTrainerConfig> {

  const expression = [x, randomAction(), x, randomAction(), x, randomAction(), x]
  const result = (new Function("x", `return ${expression.join("")}`))(x)
  expression.push("=")
  expression.push(result)

  return {
    id: "number-expression",
    uid: new UUID(1).toString(),
    expression,
  }
}