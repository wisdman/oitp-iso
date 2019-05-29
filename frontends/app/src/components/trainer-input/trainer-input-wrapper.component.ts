import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

@Component({
  selector: "trainer-input-wrapper",
  templateUrl: "./trainer-input-wrapper.component.html",
  styleUrls: [ "./trainer-input-wrapper.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerInputWrapperComponent implements OnInit {
  constructor(
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input("active")
  isActive: boolean = false

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  matrix!:SVGRectangle

  ngOnInit() {
    const padding = this._getCSSPropertyIntValue("--trainer-svg-padding");
    const {width, height} = this._elRef.nativeElement.getBoundingClientRect()

    this.matrixWidth = width
    this.matrixHeight = height

    this.matrix = genSVGRectangle(padding, padding, width - padding * 2, height - padding * 2)
  }
}
