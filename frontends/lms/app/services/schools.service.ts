import { Injectable } from "@angular/core"
// import { HttpClient, HttpParams } from "@angular/common/http"

import { Observable, of } from "rxjs"

import { ISchool } from "@common/school.interface"

const SCHOOLS: Array<ISchool> = Array.from(Array(2).keys()).map(i => ({
  id: i+1,
  title: `Школа #${i+1}`,
  city: "Екатеринбург",
  manager: "",
  email: ` ekb-${i+1}@chitai.ru`,
  phone: "+712345678" + String(i+1).padStart(2, "0"),
} as ISchool))

@Injectable({ providedIn: "root" })
export class SchoolsService {
  constructor() { }

  list(): Observable<Array<ISchool>> {
    return of(SCHOOLS)
  }

  get(id: number): Observable<ISchool> {
    return of(SCHOOLS[id])
  }

  // get<T>(path: string, inputParams: { [param: string]: string | string[] } = {}): Observable<T> {
  //   const params = new HttpParams({ fromObject: inputParams })
  //   return this
  //           .http
  //           .get<T>(path, { params })
  // }

  // post<T>(path: string, data: Partial<T>): Observable<T> {
  //   return this
  //           .http
  //           .post<T>(path, data)
  // }

  // delete<T>(path: string): Observable<T> {
  //   return this
  //           .http
  //           .delete<T>(path)
  // }

  // put<T>(path: string, data: Blob | ArrayBuffer): Observable<T> {
  //   const url = APIService.buildURL(path)
  //   return this
  //           .http
  //           .put(url, data)
  // }
}