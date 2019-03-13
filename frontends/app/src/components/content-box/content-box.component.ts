import {
  Component,
  ChangeDetectionStrategy,
  Input,
  // HostListener,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: "content-box",
  templateUrl: "./content-box.component.html",
  styleUrls: [ "./content-box.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBoxComponent {
  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  @Input()
  header!: string

  @Input()
  selection!: boolean

  @Input()
  body!: string

  get content() {
    return this._sanitizer.bypassSecurityTrustHtml(this.body)
  }

  // @HostListener("document:selectionchange", [])
  // onSelect() {
  //   console.log("select")
  // }
}
