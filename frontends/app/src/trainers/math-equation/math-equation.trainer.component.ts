import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

// import {
//   genSVGEllipse,
//   genSVGRectangle,
//   SVGRectangle,
// } from "../../lib/svg"

import { AbstractTrainerComponent } from "../abstract"

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

  mode: "play" | "result" = "play"

  isSuccess: boolean = false

  private _mathEval(equation: string): number {
    let result: number
    try {
      result = (new Function(`return (${equation}`))()
    } catch {
      return NaN
    }
    return result
  }

  // result!: number
  // matrix!: Array<SVGRectangle & { data: string }>


  init() {
    this.isSuccess = false
    // this.result = this._mathEval(this.config.equation)

    // const items = this.config.equation.replace(/[^\d]+/g, "").split("")
    // const result = this._mathEval(this.config.equation)

    // const itemHeight = this._getCSSPropertyIntValue("--trainer-box-size")
    // const itemWidth = itemHeight

    // const padding = this._getCSSPropertyIntValue("--trainer-svg-padding")
    // const gap = this._getCSSPropertyIntValue("--gap")

    // this.matrixWidth = itemWidth * columns
    //                  + gap * (columns - 1)
    //                  + padding * 2
    // this.matrixHeight = itemHeight * rows
    //                   + gap * (rows - 1)
    //                   + padding * 2


    // this.config
    //     .equation
    //     .replace(/[^\d]+/g, "")
    //     .split("")
    //     .map((data, i) => {

    //     })






    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
    this.setTimeout(0)

    console.log(this.config.equation, this._mathEval(this.config.equation))
  }

  finish() {
    this.updateResult({ result: this.isSuccess ? 100 : 0 })
    super.finish()
  }
}
