import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input, OnInit } from "@angular/core"

@Component({
  selector: "brain-charge-card",
  templateUrl: "./brain-charge.card.component.html",
  styleUrls: [ "./brain-charge.card.component.css" ],
  host: {"class": "card"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrainChargeCardComponent implements OnInit {

  @ViewChild("brainNode") matrixRef: ElementRef<HTMLDivElement>

  @Input()
  value: number = 0

  ngOnInit() {
    this.matrixRef.nativeElement.style.setProperty("--value", `${this.value}`)
  }
}
