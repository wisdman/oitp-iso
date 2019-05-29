import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core"

import { Subscription } from "rxjs"

import { KeypadService } from "../../services"

@Component({
  selector: "training-greeting",
  templateUrl: "./training-greeting.component.html",
  styleUrls: [ "./training-greeting.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingGreetingComponent implements OnInit, OnDestroy {
  constructor(
    private _keypadService: KeypadService
  ){}

  @Output("touch")
  touchValueChange = new EventEmitter<undefined>()

  private _keypadSubscriber!: Subscription

  ngOnInit() {
    this._keypadSubscriber = this._keypadService.enter.subscribe(() => this.onTouch())
  }

  ngOnDestroy() {
    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
  }

  onTouch() {
    this.touchValueChange.emit()
  }
}
