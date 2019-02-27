import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core"

import {
  IIconsTableConfig,
  IIconsTableResult,
} from "./icons-table.trainer.interfaces"

@Component({
  selector: "trainer-icons-table",
  templateUrl: "./icons-table.trainer.component.html",
  styleUrls: [ "./icons-table.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsTableTrainerComponent implements OnInit {
  @Input()
  config?: IIconsTableConfig

  @Output()
  result = new EventEmitter<IIconsTableResult>()

  constructor(
    private _hostElement: ElementRef<HTMLElement>
  ){}

  ngOnInit() {
    console.log("INIT")
    console.dir(this._hostElement.nativeElement.clientWidth)
  }
}
