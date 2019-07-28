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

import { Subscription } from "rxjs"

import { COUNTRIES } from "../../lib/country"
import {
  MONTHS,
  YEARS,
  GetBirthday,
} from "../../lib/birthday"
import { GENDERS } from "../../lib/gender"

import { UserService, IUser } from "../../services"

@Component({
  selector: "profile-main",
  templateUrl: "./profile-main.component.html",
  styleUrls: [ "./profile-main.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMainComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder,
    private _userService: UserService,
  ) {}

  private _currentDate = new Date()
  private _currentYear = this._currentDate.getFullYear()

  countries = COUNTRIES
  genders = GENDERS
  months = MONTHS
  years = YEARS

  private _maxDay: number = 31
  get days() {
    return Array.from(new Array(this._maxDay), (_, i) => i+1)
  }

  form = this._fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    gender: new FormControl(this.genders[0]),
    country: new FormControl(this.countries.find(({name}) => name === "Россия")),
    location: ['', Validators.required],

    birthday: this._fb.group({
      day: [1, Validators.required],
      month: new FormControl(this.months.find(({value}) => value === 1)),
      year: new FormControl(this.years.find(value => value === this._currentYear - 10)),
    })
  })

  get user(): Partial<IUser> {
    const data = this.form.value
    return {
      name: data.name || "",
      surname: data.surname || "",

      gender: data.gender && data.gender.value || "",
      country: data.country && data.country.name || "",
      location: data.location || "",

      birthday: `${data.birthday.year}-${String(data.birthday.month.value).padStart(2, '0')}-${String(data.birthday.day).padStart(2, '0')}`,
    }
  }

  private _updateFormFromUser(user: IUser) {
    this.form.patchValue({
      ...user,
      gender: this.genders.find(({value}) => value === user.gender) || this.genders[0],
      country: this.countries.find(({name}) => name === user.country) || this.countries.find(({name}) => name === "Россия"),
      birthday: GetBirthday(user.birthday),
    })
  }

  private _formChangeSubscriber!: Subscription
  private _userServiceSubscriber!: Subscription

  ngOnInit() {
    if (this._formChangeSubscriber) this._formChangeSubscriber.unsubscribe()
    this._formChangeSubscriber = this.form.valueChanges.subscribe(value => {
      const year = value.birthday.year
      const month = value.birthday.month.value
      const day = new Date(year, month, 0).getDate()
      if (this._maxDay != day) {
        this._maxDay = day
      }
    })

    if (this._userServiceSubscriber) this._userServiceSubscriber.unsubscribe()
    this._userServiceSubscriber = this._userService.user.subscribe(value => {
      this._updateFormFromUser(value)
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    if (this._userServiceSubscriber) this._userServiceSubscriber.unsubscribe()
    if (this._formChangeSubscriber) this._formChangeSubscriber.unsubscribe()
  }

  get avatar() {
    return ""
  }

  onSubmit(event: Event) {
    event.preventDefault()

    if (!this.form.valid) {
      return
    }

    this._userService.update(this.user).subscribe(() => {
      console.log("RESP")
    })
  }
}
