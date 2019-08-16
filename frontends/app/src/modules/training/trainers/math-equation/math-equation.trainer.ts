import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IMathEquationConfig } from "./math-equation.interfaces"

@Component({
  selector: "trainer-math-equation",
  templateUrl: "./math-equation.trainer.html",
  styleUrls: [ "./math-equation.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathEquationTrainer extends AbstractTrainer<IMathEquationConfig> {}
