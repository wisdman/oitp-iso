import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  ASSETS_RELAX,
  ASSETS_STORYTELLING,
} from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { IStorytellingTrainerConfig } from "./storytelling.trainer.interfaces"

@Component({
  selector: "trainer-storytelling",
  templateUrl: "./storytelling.trainer.component.html",
  styleUrls: [ "./storytelling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingTrainerComponent
  extends AbstractTrainerComponent<IStorytellingTrainerConfig> {

  audio!: HTMLAudioElement

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_RELAX}/${id}.${type}`
  }

  init() {
    this.audio = new Audio()
    this.audio.addEventListener("error", () => this.finish())
    this.audio.addEventListener("ended", () => this.finish())
    this.audio.addEventListener("canplaythrough", () => {
      this.audio.play()
      super.start(Math.ceil(this.audio.duration))
    })

    this.preview()
  }

  destroy() {
    this.audio.pause()
    this.audio.remove()
  }

  start() {
    this.audio.src = `${ASSETS_STORYTELLING}/${this.config.audio}.mp3`
    this.audio.load()
  }
}
