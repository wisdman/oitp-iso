import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  ASSETS_RELAX,
  ASSETS_STORYTELLING,
} from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import {
  IStorytellingTrainerConfig,
  IStorytellingTrainerResult,
} from "./storytelling.trainer.interfaces"

@Component({
  selector: "trainer-storytelling",
  templateUrl: "./storytelling.trainer.component.html",
  styleUrls: [ "./storytelling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingTrainerComponent
extends AbstractTrainerComponent<IStorytellingTrainerConfig, IStorytellingTrainerResult> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_RELAX}/${id}.${type}`
  }

  mode: "greeting" | "play" = "greeting"

  init() {
    this.mode = "greeting"
  }

  startPlay() {
    this.mode = "play"

    const audio = new Audio()
    audio.addEventListener("error", () => this.finish())
    audio.addEventListener("ended", () => this.finish())
    audio.addEventListener("canplaythrough", () => {
      this.setTimeout(Math.ceil(audio.duration))
      audio.play()
    })
    audio.src = `${ASSETS_STORYTELLING}/${this.config.audio}.mp3`
    audio.load()
  }
}
