import { Injectable } from "@angular/core"

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http"

import { Router } from "@angular/router"

import {
  empty,
  Observable,
} from "rxjs"

import { catchError } from "rxjs/operators"

import { NotificationService } from "../services"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      switch (err.status) {
        case 401:
          this.router.navigateByUrl("/login")
          break

        case 404:
          this.notificationService.message("404: Not Found")
          break

        default:
          this.notificationService.message("500: Internal server error")
          break
      }

      return empty()
    }))
  }
}