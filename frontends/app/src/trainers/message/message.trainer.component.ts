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
  IMessageTrainerConfig,
  IMessageTrainerResult,
} from "./message.trainer.interfaces"

@Component({
  selector: "trainer-message",
  templateUrl: "./message.trainer.component.html",
  styleUrls: [ "./message.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IMessageTrainerConfig

  result: IMessageTrainerResult = {
    id: "message",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMessageTrainerResult>()

  private _updateResult(result: Partial<IMessageTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  onClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  ngOnInit() {
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
