import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms"

import { COUNTRIES } from "../../lib/country"

@Component({
  selector: "profile-layout",
  templateUrl: "./profile.layout.component.html",
  styleUrls: [ "./profile.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent {
  constructor(
    private _fb: FormBuilder,
  ) {}

  countries = COUNTRIES

  genders = [{
    value: "male",
    name: "Мужчина",
    symbol: "👨",
  },{
    value: "female",
    name: "Женщина",
    symbol: "👩",
  }]

  mainForm = this._fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    gender: new FormControl(this.genders.find(({value}) => value === "male")),
    birthday: [''],
    country: new FormControl(this.countries.find(({name}) => name === "Россия")),
    location: [''],
  })

  emailForm = this._fb.group({
    email: ['', Validators.required],
    newEmail: ['', Validators.required],
    password: ['', Validators.required],
  })

  passwordForm = this._fb.group({
    currentPassword: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  get userName() {
    return ""
  }

  get avatar() {
    return ""
  }

  onMainFormSubmit(event: Event) {
    event.preventDefault()
  }

  onEmailFormSubmit(event: Event) {
    event.preventDefault()
  }

  onPasswordFormSubmit(event: Event) {
    event.preventDefault()
  }
}
