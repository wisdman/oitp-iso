import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core"

import {
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms"

import { Subscription } from "rxjs"

import { UserService } from "../../services"

@Component({
  selector: "profile-email",
  templateUrl: "./profile-email.component.html",
  styleUrls: [ "./profile-email.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEmailComponent implements OnInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
  ) {}

  form = this._fb.group({
    email: new FormControl({value: '', disabled: true}, Validators.required),
    newEmail: ['', Validators.required],
    password: ['', Validators.required],
  })

  private _userServiceSubscriber!: Subscription

  ngOnInit() {
    if (this._userServiceSubscriber) this._userServiceSubscriber.unsubscribe()
    this._userServiceSubscriber = this._userService.user.subscribe(value => {
      this.form.patchValue({ email: value.email })
    })
  }

  ngOnDestroy() {
    if (this._userServiceSubscriber) this._userServiceSubscriber.unsubscribe()
  }

  onSubmit(event: Event) {
    event.preventDefault()
  }
}
