import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router, NavigationStart } from "@angular/router"

import { Subscription } from "rxjs"
import { filter, map } from "rxjs/operators"
import { UserService } from "../../services"

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

  isSignInForm: boolean = true
  isPasswordRecovery: boolean = false

  loginForm = this._fb.group({
    email: ['', Validators.required],
    name: [''],
    password: [''],
  })

  private _updatePasswordRequired() {
    const passwordControl = this.loginForm.get("password")
    if (!passwordControl) {
      return
    }

    if (this.isSignInForm) {
      passwordControl.setValidators(Validators.required)
      return
    }

    passwordControl.clearValidators()
  }

  private _routeSubscriber!: Subscription
  private _stateSubscriber!: Subscription

  ngOnInit() {
    this._routeSubscriber = this._route.data
                                .subscribe(({signIn}) => {
                                  this.isSignInForm = !!signIn
                                  this._updatePasswordRequired()
                                  this._cdr.markForCheck()
                                })

    this._stateSubscriber = this._router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(() => this._router.getCurrentNavigation()),
      filter(<T>(value?: T | null): value is T => value !== null && value !== undefined),
      map(navigation => navigation.extras.state && navigation.extras.state.passwordRecovery && true || false),
    ).subscribe( passwordRecovery => {
      console.dir(passwordRecovery)
      this.isPasswordRecovery = passwordRecovery
      this._updatePasswordRequired()
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    this._routeSubscriber.unsubscribe()
    this._stateSubscriber.unsubscribe()
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this._userService.login(this.loginForm.value)
                     .subscribe(result => result && this._router.navigate(["/"]))
  }

  onSocialAction(type: any) {
    console.log(type)
  }
}
