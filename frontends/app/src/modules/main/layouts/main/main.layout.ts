import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

@Component({
  selector: "main-layout",
  templateUrl: "./main.layout.html",
  styleUrls: [ "./main.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
