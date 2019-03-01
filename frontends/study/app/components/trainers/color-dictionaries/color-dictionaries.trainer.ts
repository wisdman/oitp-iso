import { Component } from "@angular/core"

import { COLORS } from "./colors"

@Component({
  selector: "color-dictionaries-trainer",
  templateUrl: "./color-dictionaries.trainer.html",
  styleUrls: [ "./color-dictionaries.trainer.css" ],
})
export class ColorDictionariesTrainer {

  COLORS = Object.entries(COLORS)
                 .map( ([color, name]) => ({color: `#${color}`, name}))
                 .sort( (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

}
