import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  LapTimerService,
} from "../../services"

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
export class RelaxTrainerComponent implements OnInit {
  constructor(
    private _lapTimerService: LapTimerService,
    private _sanitizer: DomSanitizer,
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

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._initAnimations()
    this._updateResult({ isFinish: false })
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
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
}
