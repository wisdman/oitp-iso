import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IStorytellingConfig } from "./storytelling.interfaces"

const ASSETS_STORYTELLING ="/assets/storytelling"
const ASSETS_RELAX = "/assets/relax"

@Component({
  selector: "trainer-storytelling",
  templateUrl: "./storytelling.trainer.html",
  styleUrls: [ "./storytelling.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingTrainer extends AbstractTrainer<IStorytellingConfig> {

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
      super.start(Math.ceil(this.audio.duration * 1000))
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
