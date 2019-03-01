import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "news-layout",
  templateUrl: "./news.layout.component.html",
  styleUrls: [ "./news.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsLayoutComponent {}
