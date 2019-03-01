import { Component } from "@angular/core"

import { PARONIMS } from "./paronims"

@Component({
  selector: "text-dictionaries-trainer",
  templateUrl: "./text-dictionaries.trainer.html",
  styleUrls: [ "./text-dictionaries.trainer.css" ],
})
export class TextDictionariesTrainer {

  PARONIMS = PARONIMS.reduce( (p, v) => {
    const href = `http://ru-paronym.ru${v}`
    const title = v.replace(/[^а-я-]+/g, "")

    const l = title.charAt(0).toUpperCase()
    let o = p.find( v => v.l === l )
    if (!o) {
      o = { l, arr: [] }
      p.push(o)
    }

    o.arr.push({title, href})

    return p
  }, [] as Array<{ l: string, arr: Array<{title: string, href: string}>}> )

}
