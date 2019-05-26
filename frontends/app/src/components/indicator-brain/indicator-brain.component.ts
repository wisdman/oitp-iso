import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core"

import { Subscription } from "rxjs"
import { map } from "rxjs/operators"

import { UserService } from "../../services"

@Component({
  selector: "indicator-brain",
  templateUrl: "./indicator-brain.component.html",
  styleUrls: [ "./indicator-brain.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorBrainComponent implements OnInit, OnDestroy {
  @ViewChild("brainNode", { static: true }) brainRef?: ElementRef<HTMLDivElement>

  constructor(private _userService: UserService) {}
  public user = this._userService.getUser()

  private _userSubscription?: Subscription

  ngOnInit() {
    this._userSubscription = this.user
                                  .pipe(map(user => user && user.charge || 0))
                                  .subscribe(value => {
                                    window.requestAnimationFrame(()=>{
                                      if (this.brainRef && this.brainRef.nativeElement) {
                                        this.brainRef.nativeElement.style.setProperty("--value", `${value}`)
                                      }
                                    })
                                  })
  }

  ngOnDestroy() {
    if (this._userSubscription) {
      this._userSubscription.unsubscribe()
    }
  }
}
