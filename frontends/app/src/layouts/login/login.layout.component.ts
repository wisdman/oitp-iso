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
} from "@angular/forms"

import {
  ActivatedRoute,
  Router,
} from "@angular/router"

import { Subscription } from "rxjs"

import { UserService } from "../../services"

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
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {}

  mode: IMode = "login"

  loginForm = this._fb.group({
    email: ['', Validators.required],
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
    this._userService.login(this.loginForm.value)
                     .subscribe(result => result && this._router.navigate(["/"]))
  }
}
