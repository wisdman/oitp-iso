import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

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
export class RelaxTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _sanitizer: DomSanitizer,
    private _timerLapService: TimerLapService,
  ){}

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

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._initAnimations()
    this._updateResult({ isFinish: false })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.timeLimit || 0)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  sanitizeUrl(value: string) {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }

  @ViewChild('h1Node') h1NodeRef!: ElementRef<HTMLElement>

  private _initAnimations() {
    const h1 = this.h1NodeRef.nativeElement
    window.requestAnimationFrame(() => {
      h1.style.transition = "none"
      h1.style.transform = "scale(0, 0)"
      window.requestAnimationFrame(() => {
        h1.style.transition = "transform 9s"
        h1.style.transform = "scale(1, 1)"
      })
    })
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }
}
