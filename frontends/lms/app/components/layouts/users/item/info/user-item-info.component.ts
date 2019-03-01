import { Component } from "@angular/core"
import {COMMA, ENTER} from "@angular/cdk/keycodes"
import { MatChipInputEvent } from "@angular/material"

@Component({
  selector: "user-item-info",
  templateUrl: "./user-item-info.component.html",
  styleUrls: [ "./user-item-info.component.css" ],
})
export class UsersItemInfoComponent {

  education: Array<{
    type: "school" | "college" | "university" | "сourses"
    сity: string
    name: string
    title: string
    date: Date
  }> = []

  addEducation() {
    this.education.push({
      type: "school",
      сity: "",
      name: "",
      title: "",
      date: new Date(),
    })
  }

  career: Array<{
    business: boolean,
    сity: string,
    title: string,
    position: string,
    scope: string,
    subordinates: number,
  }> = []

  addCareer() {
    this.career.push({
      business: false,
      сity: "",
      title: "",
      position: "",
      scope: "",
      subordinates: 0,
    })
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hobby: Array<string> = []

  addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hobby.push(value.trim())
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }
  }

  removeHobby(h: string): void {
    const index = this.hobby.indexOf(h)

    if (index >= 0) {
      this.hobby.splice(index, 1)
    }
  }

}
