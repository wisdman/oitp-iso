import { Injectable } from "@angular/core"
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"

import { Observable } from "rxjs"
import { map, take } from "rxjs/operators"

import { ProgressService } from "./progress.service"

@Injectable()
export class ProgressResolveService implements Resolve<boolean> {

  constructor(
    private _progressService: ProgressService
  ) {}

  resolve(__: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<boolean>  {
    this._progressService.reload()
    return this._progressService.progress.pipe(map(progress=> progress && progress.length > 0), take(1))
  }
}
