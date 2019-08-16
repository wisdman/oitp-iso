import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IMathEquationConfig } from "./math-equation.interfaces"

@Component({
  selector: "trainer-math-equation",
  templateUrl: "./math-equation.trainer.component.html",
  styleUrls: [ "./math-equation.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathEquationTrainer extends AbstractTrainer<IMathEquationConfig> {}
