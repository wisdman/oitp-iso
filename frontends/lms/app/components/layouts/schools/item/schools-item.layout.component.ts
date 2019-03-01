import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ISchool } from "@common/school.interface"
import { SchoolsService } from "../../../../services"

@Component({
  selector: "schools-item-layout",
  templateUrl: "./schools-item.layout.component.html",
  styleUrls: [ "./schools-item.layout.component.css" ],
})
export class SchoolsItemLayoutComponent implements OnInit {
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _schoolsService: SchoolsService,
  ){}

  item: ISchool = {
    id: 0,
    title: "",
    city: "",
    manager: "",
    email: "",
    phone: "",
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params["id"]
      this._schoolsService.get(id as number)
          .subscribe(item => {
            if (item !== undefined){
              this.item = item
            }
          })
    })
  }
}
