import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import { IBlackboard } from "../interfaces"

const API_EXPRESSION = "$API/self/blackboard"

@Injectable()
export class BlackboardService {
  constructor(
    private _httpClient: HttpClient,
  ) {}

  GetExpression() {
    return this._httpClient.get<IBlackboard>(API_EXPRESSION)
  }
}
