import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core"

import {
  FormGroup,
  FormControl,
} from "@angular/forms"

import { Subscription, Subject, of } from "rxjs"
import { tap, switchMap, startWith, filter, take, takeWhile } from "rxjs/operators"

import { Validators } from "../../modules/w-forms"

import { LoginService } from "../../services"

@Component({
  selector: "login-form-invite",
  templateUrl: "./login-form-invite.component.html",
  styleUrls: [ "./login-form-invite.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormInviteComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _loginService: LoginService,
  ){}

  form = new FormGroup({
    email: new FormControl("",
                 Validators.Email("Некорректный E-mail"),
                 this._loginService.EmailAvailableValidator("Email уже зарегистрирован"),
               ),
  }, { })

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
      switchMap(status => {
        if (status === "VALID") {
          return of(this.form.value)
        }
        return of(null)
      }),
      tap(() => {
        this.isPending = false
        this._cdr.markForCheck()
      })
    ).subscribe(value => {
      console.log("value", value)
    }, () => console.log('COMPLITE 1'), () => console.log('COMPLITE 2'))
  }

  ngOnDestroy() {
    if (this._submitSubscription) this._submitSubscription.unsubscribe()
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this._submitSubject.next()
  }
}

// password1: new FormControl('', Validators.Сhain(
//                                     Validators.Required("Необходимо указать пароль"),
//                                     Validators.Min(5, "Пароль слишком короткий"),
//                                     Validators.RegExp(/[0-9]/, "Пароль должен содержать цифры"),
//                                     Validators.RegExp(/[a-z]/, "Пароль должен содержать буквы"),
//                                    )
//                               ),
