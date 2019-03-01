import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input } from "@angular/core"

@Component({
  selector: "five-days-discount-card",
  templateUrl: "./five-days-discount.card.component.html",
  styleUrls: [ "./five-days-discount.card.component.css" ],
  host: {"class": "card"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiveDaysDiscountCardComponent {

  @ViewChild("daysNode") daysRef: ElementRef<HTMLDivElement>

  @Input()
  value: number = 1

  ngOnInit() {
    this.daysRef.nativeElement.style.setProperty("--value", `${this.value}`)
  }
}
