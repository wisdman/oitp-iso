import { Component, ChangeDetectionStrategy } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "everyday-card",
  templateUrl: "./everyday.card.component.html",
  styleUrls: [ "./everyday.card.component.css" ],
  host: {
    "class": "card",
    "(click)": "onClick($event)"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EverydayCardComponent {

  constructor(private _router: Router){}

  onClick(event: Event) {
    event.preventDefault()
    this._router.navigateByUrl("/training")
  }

}
