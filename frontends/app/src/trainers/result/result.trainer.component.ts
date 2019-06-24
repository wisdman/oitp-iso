import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import {
  IResultTrainerConfig,
  IResultTrainerResult,
} from "./result.trainer.interfaces"

@Component({
  selector: "trainer-result",
  templateUrl: "./result.trainer.component.html",
  styleUrls: [ "./result.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTrainerComponent
extends AbstractTrainerComponent<IResultTrainerConfig, IResultTrainerResult> {

  r: number = 70 + Math.ceil(Math.random()*20)

  init() {
    this.timerService.pause()
  }
}
