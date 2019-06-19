import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

@Component({
  selector: "trainer-svg-wrapper",
  templateUrl: "./trainer-svg-wrapper.component.html",
  styleUrls: [ "./trainer-svg-wrapper.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerSVGWrapperComponent implements OnInit {
  constructor(
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input("selected")
  isSelected: boolean = false

  @Input("success")
  isSuccess: boolean = false

  @Input("error")
  isError: boolean = false

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  matrix!:SVGShape

  ngOnInit() {
    const padding = this._getCSSPropertyIntValue("--trainer-svg-padding");
    const {width, height} = this._elRef.nativeElement.getBoundingClientRect()

    this.matrixWidth = width
    this.matrixHeight = height

    this.matrix = genSVGRectangle(padding, padding, width - padding * 2, height - padding * 2)
  }
}
