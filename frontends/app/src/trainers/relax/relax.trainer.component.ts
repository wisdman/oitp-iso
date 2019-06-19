import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core"

import { ASSETS_RELAX } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import {
  IRelaxTrainerConfig,
  IRelaxTrainerResult,
} from "./relax.trainer.interfaces"

@Component({
  selector: "trainer-relax",
  templateUrl: "./relax.trainer.component.html",
  styleUrls: [ "./relax.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelaxTrainerComponent
extends AbstractTrainerComponent<IRelaxTrainerConfig, IRelaxTrainerResult> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_RELAX}/${id}.${type}`
  }

  @ViewChild('h1Node', { static: true }) h1NodeRef!: ElementRef<HTMLElement>

  init() {
    this.fullscreenService.lock()

    const h1 = this.h1NodeRef.nativeElement
    window.requestAnimationFrame(() => {
      h1.style.transition = "none"
      h1.style.transform = "scale(0, 0)"
      window.requestAnimationFrame(() => {
        h1.style.transition = `transform ${this.config.showTimeLimit}s`
        h1.style.transform = "scale(1, 1)"
      })
    })

    this.setTimeout(this.config.showTimeLimit)
  }

  timeout() {
    super.finish()
  }
}
