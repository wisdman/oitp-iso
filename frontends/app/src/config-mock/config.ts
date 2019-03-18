
import {
  ITrainerConfigs
} from "../trainers"

import { ALL_TRAINERS } from "./all"
// import { EVERYDAY_TRAINERS } from "./everyday"

export function GET_MOCK_CONFIG(type: "everyday" | "once"): Promise<Array<ITrainerConfigs> > {
  switch (type) {
    case "everyday":
      return ALL_TRAINERS()
      break

    case "once":
      return ALL_TRAINERS()
      break
  }
  throw new TypeError("Incorrect training type")
}