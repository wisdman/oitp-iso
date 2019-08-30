import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core"
import { FormGroup, FormControl, } from "@angular/forms"

import { Subscription, Subject, of } from "rxjs"
import { tap, switchMap, startWith, filter, take, takeWhile } from "rxjs/operators"

import { Validators } from "../../../w-forms"
import { LoginService } from "../../services"

@Component({
  selector: "login-form-invite",
  templateUrl: "./form-invite.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormInviteComponent implements OnInit, OnDestroy {
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
  isComplite: boolean = false

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
      switchMap(status => status === "VALID" ? this._loginService.selfInvite(this.form.value) : of(false)),
    ).subscribe(value => {
      this.isPending = false
      this.isComplite = value
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
