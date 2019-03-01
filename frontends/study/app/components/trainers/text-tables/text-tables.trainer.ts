import { Component } from "@angular/core"

import { CITY } from "./city"

@Component({
  selector: "text-tables-trainer",
  templateUrl: "./text-tables.trainer.html",
  styleUrls: [ "./text-tables.trainer.css" ],
})
export class TextTablesTrainer {

  CITY = CITY.reduce( (p, v) => {

    const l = v.charAt(0).toUpperCase()
    let o = p.find( v => v.l === l )
    if (!o) {
      o = { l, arr: [] }
      p.push(o)
    }

    o.arr.push(v)

    return p
  }, [] as Array<{ l: string, arr: Array<string> }> )

}
