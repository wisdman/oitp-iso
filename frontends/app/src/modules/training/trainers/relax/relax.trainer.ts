import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IRelaxConfig } from "./relax.interfaces"

const ASSETS_RELAX = "/assets/relax"

@Component({
  selector: "trainer-relax",
  templateUrl: "./relax.trainer.html",
  styleUrls: [ "./relax.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelaxTrainer extends AbstractTrainer<IRelaxConfig> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_RELAX}/${id}.${type}`
  }

  @ViewChild('h1Node', { static: true }) h1NodeRef!: ElementRef<HTMLElement>

  init() {
    const h1 = this.h1NodeRef.nativeElement
    window.requestAnimationFrame(() => {
      h1.style.transition = "none"
      h1.style.transform = "scale(0, 0)"
      window.requestAnimationFrame(() => {
        h1.style.transition = `transform ${this.config.previewTimeLimit}s`
        h1.style.transform = "scale(1, 1)"
      })
    })
    this.preview()
  }

  timeout() {
    super.finish()
  }
}
