import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from "@angular/core"

const SPARD_DELTA = 4

@Component({
  selector: "chart-linear",
  templateUrl: "./linear.component.html",
  styleUrls: [ "./linear.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearComponent {
  constructor(private _elRef:ElementRef<HTMLElement>){}
  private _style = getComputedStyle(this._elRef.nativeElement)

  private get _stroke(): number {
    const value = this._style.getPropertyValue("--stroke-width")
    return Number.parseInt(value) || 0
  }

  private get _gap(): number {
    const value = this._style.getPropertyValue("--bottom-gap")
    return Number.parseInt(value) || 0
  }

  get viewBox(): string {
    return `0 ${this._stroke * (SPARD_DELTA / -2)} 100 ${100 + this._stroke * SPARD_DELTA + this._gap}`
  }

  @Input()
  value: Array<number> = []

  get d(): string {
    if (!this.value) {
      return ""
    }

    const values = this.value.length === 0 ? [0] : this.value

    let min = Math.min(...values)
    let max = Math.max(...values)
    if (max === min) {
      max = Math.abs(min) * 2
      min = 0
    }
    let range = max - min

    const spade = this._stroke * SPARD_DELTA

    const step = 100/(values.length - 1)
    return values.map(v => (v - min) / range)
                 .map(v => Math.round(v * 10000) / 100)
                 .map((v, i) => [step * i, 100 - v])
                 .map(([x, y], i, arr) => {
                    let str: string

                    if (i === 0) {
                      str = `M${spade * -1} ${y} L0 ${y}`
                    } else {
                      const [px, py] = arr[i-1]
                      const dx = px + (x - px) / 2
                      str = `C${dx} ${py} ${dx} ${y} ${x} ${y}`
                    }

                    if (i === arr.length - 1) {
                      str += `L${100 + spade} ${y} L${100 + spade} ${100 + spade + this._gap} L${spade * -1} ${100 + spade + this._gap}Z`
                    }

                    return str
                 }).join("")
  }
}
