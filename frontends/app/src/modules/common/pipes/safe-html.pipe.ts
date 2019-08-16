import { Pipe, PipeTransform } from "@angular/core"
import { DomSanitizer, SafeStyle } from "@angular/platform-browser"

@Pipe({ name: "html" })
export class SafeHTMLPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustHtml(value)
  }
}