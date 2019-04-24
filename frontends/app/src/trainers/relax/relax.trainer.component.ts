import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from "@angular/core"

import {
  IRelaxTrainerConfig,
  IRelaxTrainerResult,
} from "./relax.trainer.interfaces"

@Component({
  selector: "trainer-relax",
  templateUrl: "./relax.trainer.component.html",
  styleUrls: [ "./relax.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelaxTrainerComponent {
  @Input()
  config!: IRelaxTrainerConfig

  result: IRelaxTrainerResult = {
    id: "relax",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IRelaxTrainerResult>()

  private _updateResult(result: Partial<IRelaxTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  get image() {
    return `/images/${this.config.image}.jpg`
  }

  @HostListener("click", ["$event"])
  onHostClick() {
   this._updateResult({ isFinish: true })
  }
}
