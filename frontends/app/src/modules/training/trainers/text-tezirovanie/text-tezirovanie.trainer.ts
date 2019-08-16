import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ITextTezirovanieConfig } from "./text-tezirovanie.interfaces"

@Component({
  selector: "trainer-text-tezirovanie",
  templateUrl: "./text-tezirovanie.trainer.html",
  styleUrls: [ "./text-tezirovanie.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTezirovanieTrainer extends AbstractTrainer<ITextTezirovanieConfig> {

  value!: string

  init() {
    this.fullscreenService.unlock()
    this.value = this.config.text
    this.markForCheck()
  }

  destroy() {
    this.value = ""
  }

  timeout() {
    this.result()
  }
}
