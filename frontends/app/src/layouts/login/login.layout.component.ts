import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core"

import {
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms"

import {
  ActivatedRoute,
  Router,
} from "@angular/router"

import { Subscription } from "rxjs"

import {
  UserService,
  NotificationService,
} from "../../services"

type IMode = "login" | "invite" | "reset"

@Component({
  selector: "login-layout",
  templateUrl: "./login.layout.component.html",
  styleUrls: [ "./login.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder,
    private _NotificationService: NotificationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {}

  errorMessage = ""

  mode: IMode = "login"
  result?: "invite" | "reset" = undefined

  loginForm = this._fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: [''],
  })

  private _updatePasswordRequired() {
    const passwordControl = this.loginForm.get("password")
    if (!passwordControl) {
      return
    }

    if (this.mode === "login") {
      passwordControl.setValidators(Validators.required)
      return
    }

    passwordControl.clearValidators()
  }

  private _routeSubscriber!: Subscription

  ngOnInit() {
    this._routeSubscriber = this._route.data
                                .subscribe(({mode}) => {
                                  this.mode = mode as IMode
                                  this._updatePasswordRequired()
                                  this._cdr.markForCheck()
                                })
  }

  ngOnDestroy() {
    this._routeSubscriber.unsubscribe()
  }

  onSubmit(event: Event) {
    event.preventDefault()

    if (this.mode === "login") {
      this._userService.login(this.loginForm.value)
                       .subscribe(result => result && this._router.navigate(["/"]))
      return
    }

    if (this.mode === "invite") {
      this._userService.invite(this.loginForm.value)
                       .subscribe(undefined, error => {
                          if (error.status === 200) {
                            this.result = "invite"
                          } else if (error.status === 409) {
                            this.errorMessage = "Данный E-mail уже зарегистрирован"
                          } else {
                            this._NotificationService.httpError(error.status)
                          }
                          this._cdr.markForCheck()
                       })
      return
    }

    if (this.mode === "reset") {
      this._userService.resetPassword(this.loginForm.value)
                       .subscribe(result => result && this._router.navigate(["/"]))
      return
    }


  }
}
