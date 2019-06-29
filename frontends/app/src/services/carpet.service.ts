import { Injectable } from "@angular/core"
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
} from  "@angular/common/http"

import {
  never,
  Subject,
} from "rxjs"

import {
  catchError,
  map,
  share,
  switchMap,
} from "rxjs/operators"

import { ASSETS_CARPETS } from "../app.config"

import { NotificationService } from "./notification.service"

export interface ICarperItem {
  path: string
  fill: string | null
  dx: number
  dy: number
  transform: string
}

export interface ICarper {
  width: number
  height: number
  items: Array<ICarperItem>
}

@Injectable({ providedIn: "root" })
export class CarpetService {

  constructor(
    private _httpBackend: HttpBackend,
    private _notificationService: NotificationService,
  ) {}

  private _httpClient = new HttpClient(this._httpBackend)

  private _carpetIdsSubject: Subject<number> = new Subject<number>()
  getCarpet(id: number) {
    this._carpetIdsSubject.next(id)
  }

  private _headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8")

  carpet = this._carpetIdsSubject.pipe(
    switchMap(id => this._httpClient.get(`${ASSETS_CARPETS}/${id}.svg`,{ headers: this._headers, responseType: "text"})),
    catchError(err => {
      this._notificationService.httpError(err.status)
      return never()
    }),
    map(svgValue => {
      const div = document.createElement("div")
      div.innerHTML = svgValue

      const svgNode = div.querySelector("svg")
      if (!svgNode) {
        return { width: 0, height: 0, items: new Array() } as ICarper
      }

      const viewBox = svgNode.getAttribute("viewBox") || ""
      const match = /^\s*([\d-]+)\s+([\d-]+)\s+([\d-]+)\s+([\d-]+)/.exec(viewBox)
      if (!match) {
        return { width: 0, height: 0, items: new Array() } as ICarper
      }

      const width = Number.parseInt(match[3])
      const height = Number.parseInt(match[4])

      const items = Array.from(div.querySelectorAll("svg path")).map(pathNode => {
        const path = pathNode.getAttribute("d")
        const fill = pathNode.getAttribute("fill")

        const len = (<SVGPathElement>pathNode).pathSegList
        console.dir(len)

        return {path, fill, dx:0, dy:0, transform:"translate(0px, 0px)" }
      }).filter(({path}) => !!path)

      return { width, height, items } as ICarper
    }),
    share(),
  )
}
