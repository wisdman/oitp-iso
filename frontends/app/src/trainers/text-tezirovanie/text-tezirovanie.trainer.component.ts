import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import {
  ITextTezirovanieTrainerConfig,
  ITextTezirovanieTrainerResult,
} from "./text-tezirovanie.trainer.interfaces"

@Component({
  selector: "trainer-text-tezirovanie",
  templateUrl: "./text-tezirovanie.trainer.component.html",
  styleUrls: [ "./text-tezirovanie.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTezirovanieTrainerComponent
extends AbstractTrainerComponent<ITextTezirovanieTrainerConfig, ITextTezirovanieTrainerResult> {

  mode!: "play" | "result"
  value!: string

  init() {
    this.fullscreenService.unlock()

    this.value = this.config.data

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"
    this.markForCheck()
  }

  timeout() {
    super.timeout()
    this.showResult()
  }
}
