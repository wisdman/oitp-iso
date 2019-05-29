import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IMathEquationTrainerConfig,
  IMathEquationTrainerResult,
} from "./math-equation.trainer.interfaces"

@Component({
  selector: "trainer-math-equation",
  templateUrl: "./math-equation.trainer.component.html",
  styleUrls: [ "./math-equation.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathEquationTrainerComponent
extends AbstractTrainerComponent<IMathEquationTrainerConfig, IMathEquationTrainerResult> {
  init() {
    this.setTimeout(this.config.timeLimit)
  }
}
