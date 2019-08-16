import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import { API_PUBLIC_INFO } from "../app.config"

type IInfoType = "image" | "text" | "icon"

interface IInfo {
  type: IInfoType
  data: string
}

@Injectable({ providedIn: "root" })
export class InfoService {

  constructor(private _httpClient:HttpClient) {}

  getInfo() {
    return this._httpClient.get<IInfo>(API_PUBLIC_INFO)
  }
}
