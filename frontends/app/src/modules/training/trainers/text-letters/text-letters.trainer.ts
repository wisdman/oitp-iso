import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, AfterViewChecked } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ITextLettersConfig } from "./text-letters.interfaces"

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.html",
  styleUrls: [ "./text-letters.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainer extends AbstractTrainer<ITextLettersConfig> implements AfterViewChecked {

  @ViewChild("input", {read: ElementRef, static: true }) inputRef!: ElementRef<HTMLInputElement>

  runes!: Array<{
    data: string
    userData: string
  }>

  private _userData: string = ""
  get userData() {
    return this._userData
  }
  set userData(value: string) {
    this._userData = value
    this.runes = this.runes.map(({data}, i) => ({data, userData: (this._userData[i] || "").toUpperCase() }))
    if (this._userData.length >= this.runes.length) {
      this.result()
    }
  }

  init() {
    this.fullscreenService.unlock()

    this._userData = ""
    this.runes = this.config.runes.map(data =>({data, userData: ""}))
  }

  timeout() {
    this.result()
  }

  finish() {
    const success = this.runes.reduce((acc, {data, userData}) => data === userData ? ++acc : acc, 0)
    super.finish(success / this.runes.length * 100)
  }

  ngAfterViewChecked() {
    if (this.mode === "play" && this.inputRef.nativeElement !== document.activeElement) {
      this.inputRef.nativeElement.focus()
    }
  }
}
