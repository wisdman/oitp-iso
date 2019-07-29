import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ITextTezirovanieTrainerConfig } from "./text-tezirovanie.trainer.interfaces"

@Component({
  selector: "trainer-text-tezirovanie",
  templateUrl: "./text-tezirovanie.trainer.component.html",
  styleUrls: [ "./text-tezirovanie.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTezirovanieTrainerComponent
  extends AbstractTrainerComponent<ITextTezirovanieTrainerConfig> {

  value!: string

  init() {
    this.fullscreenService.unlock()
    this.value = this.config.data
    this.markForCheck()
  }

  destroy() {
    this.value = ""
  }

  timeout() {
    this.result()
  }
}
