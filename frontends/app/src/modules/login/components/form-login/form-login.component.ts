import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core"
import { FormGroup, FormControl } from "@angular/forms"

import { Subscription, Subject, of } from "rxjs"
import { tap, switchMap, startWith, filter, take, takeWhile } from "rxjs/operators"

import { LoginService } from "../../services"
import { Validators } from "../../../w-forms"

@Component({
  selector: "login-form-login",
  templateUrl: "./form-login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormLoginComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _loginService: LoginService,
  ){}

  form = new FormGroup({
    email: new FormControl('', Validators.Email("Некорректный E-mail")),
    password: new FormControl('', Validators.Required("Необходимо указать пароль")),
  })

  isPending: boolean = false

  private _submitSubject: Subject<void> = new Subject<void>()
  private _submitSubscription!: Subscription

  ngOnInit() {
    if (this._submitSubscription) this._submitSubscription.unsubscribe()
    this._submitSubscription = this._submitSubject.pipe(
      takeWhile(() => !this.isPending),
      tap(() => {
        this.isPending = true
        this._cdr.markForCheck()
        this.form.markAllAsTouched()
        for (const key in this.form.controls) this.form.controls[key].updateValueAndValidity({ emitEvent: true })
      }),
      switchMap(() => this.form.statusChanges.pipe(
        startWith(this.form.status),
        filter(status => status !== "PENDING"),
        take(1),
      )),
      switchMap(status => status === "VALID" ? this._loginService.loginByEmail(this.form.value) : of(undefined)),
    ).subscribe(() => {
      this.isPending = false
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    if (this._submitSubscription) this._submitSubscription.unsubscribe()
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this._submitSubject.next()
  }

}
