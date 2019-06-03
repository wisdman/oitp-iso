import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

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

  init() {
    this.setTimeout(this.config.timeLimit)
  }

  onClick() {
    this.finish()
  }
}
