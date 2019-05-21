import { Component, ChangeDetectionStrategy } from "@angular/core"

import { RecommendationService } from "../../services"

@Component({
  selector: "card-recommendations",
  templateUrl: "./card-recommendations.component.html",
  styleUrls: [ "./card-recommendations.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRecommendationsComponent {
  constructor(private _recommendationService: RecommendationService) {}
  public recommendation = this._recommendationService.getRecommendation()
}
