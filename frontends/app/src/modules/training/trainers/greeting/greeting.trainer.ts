import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IGreetingConfig } from "./greeting.interfaces"

@Component({
  selector: "trainer-greeting",
  templateUrl: "./greeting.trainer.html",
  styleUrls: [ "./greeting.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingTrainer extends AbstractTrainer<IGreetingConfig> {

  finish() {
    this.timerService.continue()
    super.finish()
  }
}
