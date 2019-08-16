import { Pipe, PipeTransform } from "@angular/core"
import { DomSanitizer, SafeStyle } from "@angular/platform-browser"

@Pipe({ name: "url" })
export class SafeURLPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustUrl(value)
  }
}