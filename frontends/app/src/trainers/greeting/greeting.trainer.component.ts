import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import {
  IGreetingTrainerConfig,
} from "./greeting.trainer.interfaces"

@Component({
  selector: "trainer-greeting",
  templateUrl: "./greeting.trainer.component.html",
  styleUrls: [ "./greeting.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingTrainerComponent
  extends AbstractTrainerComponent<IGreetingTrainerConfig> {

  finish() {
    this.timerService.continue()
    super.finish()
  }
}
