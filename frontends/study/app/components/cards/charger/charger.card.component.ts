import { Component, ChangeDetectionStrategy } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "charger-card",
  templateUrl: "./charger.card.component.html",
  styleUrls: [ "./charger.card.component.css" ],
  host: {
    "class": "card",
    "(click)": "onClick($event)"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargerCardComponent {

  constructor(private _router: Router){}

  onClick(event: Event) {
    event.preventDefault()
    this._router.navigateByUrl("/trainer")
  }

}
