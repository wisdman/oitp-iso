import { Injectable } from "@angular/core"
import { HttpBackend, HttpClient, HttpHeaders, HttpParams} from  "@angular/common/http"

import { Observable } from "rxjs"

import { FingerprintService } from "./fingerprint.service"
import { ConfigService } from "./config.service"
import { TokenService } from "./token.service"

import { IAPIError } from "../interface/api-error.interface"

const  =

@Injectable()
export class ApiService {
  static AUTH_TOKEN_HEADER = "X-Authorization"

  constructor(
    private _fingerprintService: FingerprintService,
    private _httpBackend: HttpBackend,
    private _httpClient:HttpClient,
    private _configService: ConfigService,
    private _tokenService: TokenService,
  ) {}

  private _updateHeaders(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
    headers.set(ApiService.AUTH_TOKEN_HEADER, this._tokenService.token)
    return headers
  }

  Delete<T extends object & ( keyof T extends string ? {} : "T must only have string keys" ) | void>(
    url: string,
    { headers, params, public = false}:{ headers?: HttpHeaders, params?: HttpParams, public?: boolean } = {},
  ): Observable<T | IAPIError> {
    if (!public && !this._tokenService.hasToken) {
      null
      return
    }

    return this._httpClient.delete<T | IAPIError>(
      this._configService.APIPath(url),
      {...options, responseType: "json" }
    )
  }

  Get<T extends object & ( keyof T extends string ? {} : "T must only have string keys" ) | void>(
    url: string,
    options: { headers?: HttpHeaders, params?: HttpParams } = {},
  ): Observable<T | IAPIError> {
    return this._httpClient.get<T | IAPIError>(this._configService.APIPath(url), {...options, responseType: "json" })
  }

  Post<T extends object & (keyof T extends string ? {} : "T must only have string keys") | void>(
    url: string,
    body: { [ket: string]: any },
    options: { headers?: HttpHeaders, params?: HttpParams } = {},
  ): Observable<T | IAPIError> {
    return this._httpClient.post<T | IAPIError>(this._configService.APIPath(url), body, {...options, responseType: "json" })
  }

  Patch<T extends object & (keyof T extends string ? {} : "T must only have string keys") | void>(
    url: string,
    body: { [ket: string]: any },
    options: { headers?: HttpHeaders, params?: HttpParams } = {},
  ): Observable<T | IAPIError> {
    return this._httpClient.patch<T | IAPIError>(this._configService.APIPath(url), body, {...options, responseType: "json" })
  }

  Put<T extends object & (keyof T extends string ? {} : "T must only have string keys") | void>(
    url: string,
    body: { [ket: string]: any },
    options: { headers?: HttpHeaders, params?: HttpParams } = {},
  ): Observable<T | IAPIError> {
    return this._httpClient.put<T | IAPIError>(this._configService.APIPath(url), body, {...options, responseType: "json" })
  }
}


intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._tokenService.token

    if (!token) {
      this._router.navigateByUrl("/login")
      return empty()
    }

    request = request.clone({
      setHeaders: {
        [AUTH_TOKEN_HEADER]: token
      }
    })

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this._tokenService.token = ""
        this._router.navigateByUrl("/login")
      } else {
        this._notificationService.httpError(err.status)
      }
      return empty()
    }))
  }