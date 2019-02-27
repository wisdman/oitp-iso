import { Injectable } from "@angular/core"

import { Observable } from "rxjs"

import {
  TTrainingConfig
} from "../trainers"

import {
  RANDOM_CONFIG
} from "../trainers/random"

@Injectable({ providedIn: "root" })
export class TrainingService {
  getTraining(type: "everyday" | "once"): Observable<TTrainingConfig> {
    return RANDOM_CONFIG(type)
  }
}
