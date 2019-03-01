import { Component } from "@angular/core"

import { ICONS } from "./icons"

@Component({
  selector: "image-puzzle-trainer",
  templateUrl: "./image-puzzle.trainer.html",
  styleUrls: [ "./image-puzzle.trainer.css" ],
})
export class ImagePuzzleTrainer {

  getIcons(n: number = ICONS.length) {
    ICONS.sort(() => Math.random() - 0.5).slice(0, n)
  }

}
