import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import {
  ITezirovanieTrainerConfig,
  ITezirovanieTrainerResult,
} from "./tezirovanie.trainer.interfaces"

@Component({
  selector: "trainer-tezirovanie",
  templateUrl: "./tezirovanie.trainer.component.html",
  styleUrls: [ "./tezirovanie.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TezirovanieTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: ITezirovanieTrainerConfig

  result: ITezirovanieTrainerResult = {
    id: "tezirovanie",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITezirovanieTrainerResult>()

  private _updateResult(result: Partial<ITezirovanieTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  ngOnInit() {
    // console.log(this.config)
    this._updateResult({
      isFinish: false,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
