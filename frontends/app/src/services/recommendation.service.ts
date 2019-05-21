import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import {
  API_RECOMMENDATION
} from "../app.config"

type IRecommendationType = "image" | "text" | "icon"

interface IRecommendation {
  type: IRecommendationType
  data: string
}

@Injectable({ providedIn: "root" })
export class RecommendationService {

  constructor(private _httpClient:HttpClient) {}

  getRecommendation() {
    return this._httpClient.get<IRecommendation>(API_RECOMMENDATION)
  }
}
