import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core"

@Component({
  selector: "linear-chart",
  templateUrl: "./linear.chart.component.html",
  styleUrls: [ "./linear.chart.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearChartComponent {
  @Input()
  value: Array<number> = []

  @Input()
  min: number = 0

  @Input()
  max: number = 100

  get dValue() {
    if (!Array.isArray(this.value) || this.value.length === 0) {
      return ""
    }

    const step = 100/(this.value.length - 1)
    return this.value.map((v, i) => [step*i, 100 - Math.min(Math.max(v, this.min), this.max)])
              .map(([x, y], i, arr) => {
                if (i === 0) {
                  return `M-50 ${y} L0 ${y}`
                }

                const [px, py] = arr[i-1]
                const dx = px + (x - px) / 2

                let str = `C${dx} ${py} ${dx} ${y} ${x} ${y}`

                if (i === arr.length - 1) {
                  str += `L150 ${y} L150 150 L-50 150Z`
                }

                return str
              }).join("")
  }
}
