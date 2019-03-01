import { Injectable } from "@angular/core"
// import { HttpClient, HttpParams } from "@angular/common/http"

import { Observable, of } from "rxjs"

import { IUser } from "@common/user.interface"

const USERS: Array<IUser> = Array.from(Array(30).keys()).map(i => ({
  id: i+1,
  name: `Пользователь Bot #${i+1}`,
  avatar: 0,
  roles: ["user"],
  email: `bot${i+1}@chitai.ru`,
  phone: "+712345678" + String(i+1).padStart(2, "0"),
} as IUser))

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor() { }

  list(): Observable<Array<IUser>> {
    return of(USERS)
  }

  get(id: number): Observable<IUser> {
    return of(USERS[id])
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