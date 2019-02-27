
import { Observable, from } from "rxjs"

import {
  TTrainingConfig
} from "../"

import {
  getIconsTableRandomConfig
} from "./icons-table.random"


function RANDOM_EVERYDAY(): Observable<TTrainingConfig> {
  const trainersConfig = [
    getIconsTableRandomConfig()
  ]

  const result = Promise.all(trainersConfig)
  return from(result)
}


function RANDOM_ONCE(): Observable<TTrainingConfig> {
  const trainersConfig = [
    getIconsTableRandomConfig()
  ]

  const result = Promise.all(trainersConfig)
  return from(result)
}


export function RANDOM_CONFIG(type: "everyday" | "once"): Observable<TTrainingConfig> {
  switch (type) {
    case "everyday":
      return RANDOM_EVERYDAY()
      break

    case "once":
      return RANDOM_ONCE()
      break
  }
  throw new TypeError("Incorrect training type")
}



