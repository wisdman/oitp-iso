import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from "@angular/core"

export type ISocialBbuttonType = "vkontakte" | "facebook" | "twitter" | "mailru" | "yandex"

@Component({
  selector: "social-buttons",
  templateUrl: "./social-buttons.component.html",
  styleUrls: [ "./social-buttons.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialBbuttonsComponent {
  @Input()
  buttons: Array<ISocialBbuttonType> = []

  @Output("action")
  actionValueChange = new EventEmitter<ISocialBbuttonType>()

  isShow(type:ISocialBbuttonType) {
    return this.buttons.includes(type)
  }

  getOrder(type:ISocialBbuttonType) {
    return this.buttons.indexOf(type)
  }

  onClick(type:ISocialBbuttonType) {
    this.actionValueChange.emit(type)
  }
}
